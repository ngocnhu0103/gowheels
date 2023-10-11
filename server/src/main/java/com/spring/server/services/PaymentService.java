package com.spring.server.services;

import com.spring.server.data.PaymentData;
import com.spring.server.models.Surcharge;
import com.spring.server.repositories.BookRepository;
import com.spring.server.repositories.UserRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.Customer;
import com.stripe.model.CustomerSearchResult;
import com.stripe.model.checkout.Session;
import com.stripe.param.CustomerCreateParams;
import com.stripe.param.CustomerSearchParams;
import com.stripe.param.SubscriptionItemCreateParams;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private  final  UserRepository userRepository;
    private  final BookRepository bookRepository;

    private static final   String secretKey = System.getenv("stripe.api.key");

    private static final   String urlCLient = System.getenv("client.url");


    public String checkOut(Long bookId, Authentication authentication) throws StripeException {
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



        SessionCreateParams.Builder paramsBuilder = SessionCreateParams.builder()
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setCustomer(customer.getId())
                .setSuccessUrl(urlCLient + "/success?session_id={CHECKOUT_SESSION_ID}")
                .setCancelUrl(urlCLient + "/failure");


        paramsBuilder.addLineItem(SessionCreateParams.LineItem.builder()
                .setQuantity(1L).setPriceData(SessionCreateParams.LineItem.PriceData.builder().setProductData(
                        SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                .putMetadata("gowheels", book.get().getId().toString()).setName(book.get().getBike().getBikeName())
                                .build()
                ).setCurrency("vnd").build()).build()
        );
        for(Surcharge surcharge : book.get().getSurchargeList()){
            paramsBuilder.addLineItem(SessionCreateParams.LineItem.builder()
                    .setQuantity(1L).setPriceData(SessionCreateParams.LineItem.PriceData.builder().setProductData(
                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                    .putMetadata("surcharge", surcharge.getId().toString()).setName(surcharge.getName())
                                    .build()
                    ).setCurrency("vnd").build()).build()
            );
        }

        Session session = Session.create(paramsBuilder.build());

        return session.getUrl();
    }
}
