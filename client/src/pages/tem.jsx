<main className="container w-4/5 mx-auto ">
    <Header />

    <section className="grid grid-cols-3 mt-12 gap-6">
        <Navigation activeName={activeName}></Navigation>
        <div className="col-span-2  rounded-xl p-4">{/* code */}</div>
    </section>
    <Footer />
</main>;
