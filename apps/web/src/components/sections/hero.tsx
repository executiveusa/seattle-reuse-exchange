export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-600 to-blue-600 py-20 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold tracking-tight mb-6">
            Keep Good Stuff Out of the Dump.
          </h1>
          <p className="text-xl mb-8 text-blue-100">
            Bid on rescued office furniture & gear. Every purchase funds local reuse across Seattle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-md font-medium">
              Browse Auctions
            </button>
            <button className="border border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-md font-medium">
              Donate Goods
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}