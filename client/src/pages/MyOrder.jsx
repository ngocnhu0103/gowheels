import { useEffect, useState, lazy, Suspense } from "react";
import Tab from "../components/profile/Tab";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import Navigation from "../components/profile/Navigation";
import Footer from "../components/Footer";
import { getMyBooksAPI, paymentAPI, paymentDepositAPI, updateStatusBookAPI } from "../api/bookAPI";
import { Skeleton } from "@mui/material";
const BookCard = lazy(() => import("../components/BookCard"));

function MyOrder() {
    const location = useLocation();
    const dispatch = useDispatch();
    const activeName = location.pathname.split("/")[location.pathname.split("/").length - 1];
    const { user, myBooks } = useSelector((state) => {
        return state.auth;
    });

    const [tab, setTab] = useState("1");
    useEffect(() => {
        const fetchMyBooks = async () => {
            await getMyBooksAPI(dispatch);
        };
        fetchMyBooks();
    }, []);
    const BookLoading = () => {
        return (
            <div className="flex flex-col gap-20 h-screen">
                <div>
                    <Skeleton width={"50%"} />
                    <Skeleton width={"80%"} animation="wave" />
                    <Skeleton width={"60%"} />
                    <Skeleton width={"80%"} animation="wave" />
                    <Skeleton animation={false} />
                </div>
                <div>
                    <Skeleton width={"50%"} />
                    <Skeleton width={"80%"} animation="wave" />
                    <Skeleton width={"60%"} />
                    <Skeleton width={"80%"} animation="wave" />
                    <Skeleton animation={false} />
                </div>
                <div>
                    <Skeleton width={"50%"} />
                    <Skeleton width={"80%"} animation="wave" />
                    <Skeleton width={"60%"} />
                    <Skeleton width={"80%"} animation="wave" />
                    <Skeleton animation={false} />
                </div>
            </div>
        );
    };
    const updateStatus = async (bookId, newStatus) => {
        await updateStatusBookAPI(dispatch, bookId, newStatus);
    };
    const paymentDeposit = async (bookId) => {
        const data = await paymentDepositAPI(dispatch, bookId);
        await window.location.replace(data);
    };
    const payment = async (bookId) => {
        const data = await paymentAPI(dispatch, bookId);
        await window.location.replace(data);
    };
    return (
        <main className="container w-4/5 mx-auto ">
            <Header />
            <section className="grid grid-cols-3 mt-12 gap-6">
                <Navigation activeName={activeName}></Navigation>
                <div className="col-span-2  rounded-xl p-4">
                    {/* code */}
                    <div>
                        <h1 className=" text-3xl font-banner text-primary pb-5">Đơn hàng của tôi</h1>
                        <Tab tab={tab} setTab={setTab} />
                        <ul className="mt-5 flex flex-col gap-5 relative max-h-[70vh] overflow-auto snap-y snap-mandatory">
                            <Suspense fallback={<BookLoading />}>
                                {myBooks && myBooks.length > 0
                                    ? myBooks.map((book) => {
                                          return (
                                              <BookCard
                                                  book={book}
                                                  user={user}
                                                  key={book.id}
                                                  updateStatus={updateStatus}
                                                  paymentDeposit={paymentDeposit}
                                                  payment={payment}
                                              />
                                          );
                                      })
                                    : null}
                            </Suspense>
                        </ul>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}

export default MyOrder;
