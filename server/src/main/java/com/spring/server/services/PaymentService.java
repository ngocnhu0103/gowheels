package com.spring.server.services;

import com.spring.server.data.PaymentData;
import com.spring.server.data.ResponseObject;
import com.spring.server.models.Surcharge;
import com.spring.server.repositories.BookRepository;
import com.spring.server.repositories.UserRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerSearchResult;
import com.stripe.model.checkout.Session;
import com.stripe.net.RequestOptions;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerSearchParams;
import com.stripe.param.SubscriptionItemCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private  final  UserRepository userRepository;
    private  final BookRepository bookRepository;

    private  final Environment environment;

//    private static final   String urlCLient = System.getenv("client.url");


    public ResponseEntity<ResponseObject> checkOut(Long bookId, Authentication authentication) throws StripeException {
        Stripe.apiKey = environment.getProperty("stripe.api.key");
        var auth = userRepository.findByEmail(authentication.getName());
        var book = bookRepository.findById(bookId);
        Customer  customer;

        CustomerSearchParams customerSearchParams = CustomerSearchParams.builder().setQuery("email:'" + auth.get().getEmail() + "'").build();

        CustomerSearchResult result = Customer.search(customerSearchParams);

        if (result.getData().size() == 0){
            CustomerCreateParams customerCreateParams = CustomerCreateParams.builder()
                    .setEmail(auth.get().getEmail())
                    .setName(auth.get().getFullName()).build();

            customer = Customer.create(customerCreateParams);
        } else {
            customer = result.getData().get(0);
        }


        var unitAmount = Math.round(book.get().getTotalPrice() * 1000);
        SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setCustomer(customer.getId())
                .setSuccessUrl(environment.getProperty("client.url") + "success/end?session_id={CHECKOUT_SESSION_ID}&bookId=" + bookId)
                .setCancelUrl(environment.getProperty("client.url") + "failure/end");


        paramsBuilder.addLineItem(SessionCreateParams.LineItem.builder()
                .setQuantity(1L).setPriceData(SessionCreateParams.LineItem.PriceData.builder().setProductData(
                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                .putMetadata("gowheels", book.get().getId().toString()).setName(book.get().getBike().getBikeName())
                                .build()
                ).setCurrency("vnd").setUnitAmountDecimal(BigDecimal.valueOf(unitAmount)).build()).build()
        );
        for(Surcharge surcharge : book.get().getSurchargeList()){
            paramsBuilder.addLineItem(SessionCreateParams.LineItem.builder()
                    .setQuantity(1L).setPriceData(SessionCreateParams.LineItem.PriceData.builder().setProductData(
                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                    .putMetadata("surcharge", surcharge.getId().toString()).setName(surcharge.getName())
                                    .build()
                    ).setCurrency("vnd").setUnitAmountDecimal(BigDecimal.valueOf(Math.round(surcharge.getPrice()))).build()).build()
            );
        }

        Session session = Session.create(paramsBuilder.build());
        System.out.println(session);

        return ResponseEntity.status(200).body(ResponseObject.builder().statusCode(200).message("successful").data(session.getUrl()).build());
    }

    public ResponseEntity<ResponseObject> paymentDeposit(Long bookId, Authentication authentication) throws StripeException {

        Stripe.apiKey = environment.getProperty("stripe.api.key");

        var auth = userRepository.findByEmail(authentication.getName());
        var book = bookRepository.findById(bookId);
        Customer  customer;

        CustomerSearchParams customerSearchParams = CustomerSearchParams.builder().setQuery("email:'" + auth.get().getEmail() + "'").build();

        CustomerSearchResult result = Customer.search(customerSearchParams);

        if (result.getData().size() == 0){
            CustomerCreateParams customerCreateParams = CustomerCreateParams.builder()
                    .setEmail(auth.get().getEmail())
                    .setName(auth.get().getFullName()).build();

            customer = Customer.create(customerCreateParams);
        } else {
            customer = result.getData().get(0);
        }
        var unitAmount = Math.round(book.get().getTotalPrice() * 0.1 * 1000);
        SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setCustomer(customer.getId())
                .setSuccessUrl(environment.getProperty("client.url") + "success?session_id={CHECKOUT_SESSION_ID}&bookId=" + bookId)
                .setCancelUrl(environment.getProperty("client.url") + "failure");

        paramsBuilder.addLineItem(SessionCreateParams.LineItem.builder()
                .setQuantity(1L).setPriceData(SessionCreateParams.LineItem.PriceData.builder().setProductData(
                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                .putMetadata("gowheels", book.get().getId().toString()).setName(book.get().getBike().getBikeName())
                                .build()
                ).setCurrency("vnd").setUnitAmountDecimal(BigDecimal.valueOf(unitAmount)).build()).build()
        );

        Session session = Session.create(paramsBuilder.build());
        System.out.println(session);

        return ResponseEntity.status(200).body(ResponseObject.builder().statusCode(200).message("successful").data(session.getUrl()).build());
    }
    public ResponseEntity<ResponseObject> findBySessionId(String sessionId,Long bookId) throws StripeException{
        Stripe.apiKey = environment.getProperty("stripe.api.key");
        Session session = Session.retrieve(sessionId);

        if(session != null){
            var book = bookRepository.findById(bookId);
            book.get().setDeposit(true);
            book.get().setStatus("Đã cọc");
            bookRepository.save(book.get());

            return ResponseEntity.status(200).body(ResponseObject.builder().statusCode(200).message("successful").data(session.getMetadata()).build());
        }

        return ResponseEntity.status(404).body(ResponseObject.builder().statusCode(404).message("Session Not found").data("").build());
    }
    public ResponseEntity<ResponseObject> findBySessionIdAfterPayment(String sessionId,Long bookId) throws StripeException{
        Stripe.apiKey = environment.getProperty("stripe.api.key");
        Session session = Session.retrieve(sessionId);

        if(session != null){
            var book = bookRepository.findById(bookId);
            var owner = userRepository.findById(
                    book.get().getBike().getOwner().getId()
            );
            if(book.get().getStatus().compareTo("Đã thanh toán") != 0) {
                Double currentBalance = owner.get().getBalance();
                owner.get().setBalance(
                        (double)
                        Math.round(
                                (currentBalance + session.getAmountTotal()) * 100
                        )/100
                );
                book.get().setStatus("Đã thanh toán");

                bookRepository.save(book.get());
                userRepository.save(owner.get());
            }


            return ResponseEntity.status(200).body(ResponseObject.builder().statusCode(200).message("successful").data(session.getMetadata()).build());
        }

        return ResponseEntity.status(404).body(ResponseObject.builder().statusCode(404).message("Session Not found").data("").build());


    }
}
