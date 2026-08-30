"use client";

import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  country: string;
  price: number;
  currency: string;
  image: string;
  description: string;
  vendor: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Luxury Rose Bouquet",
    category: "Flowers & Romance",
    country: "USA",
    price: 65,
    currency: "USD",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=900&q=85",
    description:
      "A beautiful premium rose arrangement suitable for birthdays, anniversaries and romantic surprises.",
    vendor: "Global Flower Partner",
  },
  {
    id: 2,
    name: "Premium Celebration Flowers",
    category: "Flowers & Romance",
    country: "UK",
    price: 55,
    currency: "GBP",
    image:
      "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=85",
    description:
      "Fresh flowers professionally arranged and prepared for delivery.",
    vendor: "London Gift Partner",
  },
  {
    id: 3,
    name: "Classic Gift Ring",
    category: "Jewelry & Keepsakes",
    country: "USA",
    price: 120,
    currency: "USD",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=85",
    description:
      "A classic jewelry gift suitable for a special celebration.",
    vendor: "Premium Jewelry Partner",
  },
  {
    id: 4,
    name: "Personalized Picture Frame",
    category: "Jewelry & Keepsakes",
    country: "UK",
    price: 45,
    currency: "GBP",
    image:
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&w=900&q=85",
    description:
      "A thoughtful keepsake that can be personalized with a special photograph.",
    vendor: "Keepsake Partner",
  },
  {
    id: 5,
    name: "Pizza Celebration Box",
    category: "Food & Treats",
    country: "USA",
    price: 50,
    currency: "USD",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
    description:
      "A delicious pizza package for birthdays, celebrations and surprise deliveries.",
    vendor: "Local Food Partner",
  },
  {
    id: 6,
    name: "Premium Snack Box",
    category: "Food & Treats",
    country: "UK",
    price: 40,
    currency: "GBP",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476a?auto=format&fit=crop&w=900&q=85",
    description:
      "A curated selection of sweet and savory treats prepared for gifting.",
    vendor: "UK Snack Partner",
  },
  {
    id: 7,
    name: "Birthday Celebration Cake",
    category: "Cakes & Desserts",
    country: "USA",
    price: 70,
    currency: "USD",
    image:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85",
    description:
      "A celebration cake suitable for birthdays and special occasions.",
    vendor: "Celebration Cake Partner",
  },
  {
    id: 8,
    name: "Chocolate Gift Box",
    category: "Food & Treats",
    country: "USA",
    price: 35,
    currency: "USD",
    image:
      "https://images.unsplash.com/photo-1549007994-cb92caebd54b?auto=format&fit=crop&w=900&q=85",
    description:
      "A premium chocolate selection prepared as a thoughtful gift.",
    vendor: "Chocolate Partner",
  },
  {
    id: 9,
    name: "Birthday Gift Basket",
    category: "Gift Baskets",
    country: "UK",
    price: 75,
    currency: "GBP",
    image:
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=900&q=85",
    description:
      "A curated gift basket combining treats and celebration items.",
    vendor: "UK Gift Basket Partner",
  },
  {
    id: 10,
    name: "Teddy Bear Surprise",
    category: "Teddy Bears & Plush",
    country: "USA",
    price: 45,
    currency: "USD",
    image:
      "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=900&q=85",
    description:
      "A soft teddy bear gift for birthdays, anniversaries and special surprises.",
    vendor: "Plush Gift Partner",
  },
  {
    id: 11,
    name: "Premium Gift Box",
    category: "Gift Baskets",
    country: "UAE",
    price: 220,
    currency: "AED",
    image:
      "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=900&q=85",
    description:
      "A premium curated gift package prepared for a memorable occasion.",
    vendor: "Dubai Gift Partner",
  },
  {
    id: 12,
    name: "Personalized Celebration Gift",
    category: "Custom Gifts",
    country: "Canada",
    price: 60,
    currency: "CAD",
    image:
      "https://images.unsplash.com/photo-1513884923967-4b182ef167ab?auto=format&fit=crop&w=900&q=85",
    description:
      "A customizable gift package designed around the recipient and occasion.",
    vendor: "Canada Custom Gifts",
  },
];

const categories = [
  {
    name: "Flowers & Romance",
    icon: "💐",
    text: "Flowers, roses and romantic surprises",
  },
  {
    name: "Food & Treats",
    icon: "🍕",
    text: "Pizza, snacks, chocolates and treats",
  },
  {
    name: "Jewelry & Keepsakes",
    icon: "💍",
    text: "Rings, jewelry and picture frames",
  },
  {
    name: "Cakes & Desserts",
    icon: "🎂",
    text: "Cakes and celebration desserts",
  },
  {
    name: "Gift Baskets",
    icon: "🎁",
    text: "Premium curated gift boxes",
  },
  {
    name: "Celebration Gifts",
    icon: "🎈",
    text: "Birthday and special occasion gifts",
  },
];

const countries = [
  { name: "USA", flag: "🇺🇸", currency: "USD" },
  { name: "UK", flag: "🇬🇧", currency: "GBP" },
  { name: "Canada", flag: "🇨🇦", currency: "CAD" },
  { name: "UAE", flag: "🇦🇪", currency: "AED" },
  { name: "Australia", flag: "🇦🇺", currency: "AUD" },
];

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState("USA");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const countryMatch =
        selectedCountry === "All" ||
        product.country.toLowerCase() === selectedCountry.toLowerCase();

      const categoryMatch =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const searchMatch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      return countryMatch && categoryMatch && searchMatch;
    });
  }, [selectedCountry, selectedCategory, search]);

  function addToCart(product: Product) {
    setCart((current) => [...current, product]);
    setSelectedProduct(null);
  }

  function removeFromCart(index: number) {
    setCart((current) => current.filter((_, i) => i !== index));
  }

  function orderOnWhatsApp(product?: Product) {
    const item = product || cart[0];

    if (!item) {
      alert("Please select a gift first.");
      return;
    }

    const message = `Hello Global Link Express 👋

I want to order a gift.

Gift: ${item.name}
Category: ${item.category}
Destination: ${selectedCountry}

Please confirm current vendor availability, delivery cost and final price.

Thank you.`;

    window.open(
      `https://wa.me/2349132056011?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  }

  return (
    <main className="min-h-screen bg-[#07101f] text-white">
      {/* HEADER */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07101f]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <button
            onClick={() =>
              document
                .getElementById("home")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-blue-500 text-xl">
              🎁
            </div>
            <div className="text-left">
              <div className="font-black tracking-tight">
                GLOBAL LINK EXPRESS
              </div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-slate-400">
                Global Gift Marketplace
              </div>
            </div>
          </button>

          <nav className="hidden items-center gap-7 text-sm text-slate-300 md:flex">
            <button
              onClick={() =>
                document
                  .getElementById("categories")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="transition hover:text-white"
            >
              Categories
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="transition hover:text-white"
            >
              Gifts
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("how-it-works")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="transition hover:text-white"
            >
              How It Works
            </button>
            <button
              onClick={() => setShowCart(true)}
              className="rounded-full border border-white/15 px-4 py-2 hover:bg-white/10"
            >
              🛒 Cart ({cart.length})
            </button>
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="rounded-lg border border-white/10 px-3 py-2 md:hidden"
          >
            ☰
          </button>
        </div>

        {menuOpen && (
          <div className="border-t border-white/10 px-5 py-4 md:hidden">
            <div className="flex flex-col gap-3 text-slate-300">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  document
                    .getElementById("categories")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-left"
              >
                Categories
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-left"
              >
                Gifts
              </button>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  setShowCart(true);
                }}
                className="text-left"
              >
                🛒 Cart ({cart.length})
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section
        id="home"
        className="relative overflow-hidden border-b border-white/10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,.22),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(236,72,153,.18),transparent_30%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
          <div>
            <div className="mb-5 inline-flex rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-300">
              🌍 Send love across borders
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              Send a gift.
              <br />
              <span className="bg-gradient-to-r from-blue-300 via-white to-pink-300 bg-clip-text text-transparent">
                Make it unforgettable.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-300">
              Discover gifts from trusted local vendors and send flowers,
              food, cakes, jewelry and surprises to someone you love abroad.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() =>
                  document
                    .getElementById("products")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-xl bg-white px-6 py-4 font-bold text-slate-950 shadow-xl transition hover:scale-[1.02]"
              >
                Explore Gifts →
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("categories")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="rounded-xl border border-white/15 bg-white/5 px-6 py-4 font-bold backdrop-blur transition hover:bg-white/10"
              >
                Browse Categories
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[2rem] bg-blue-500/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=1200&q=85"
                alt="Gift boxes"
                className="h-[430px] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-6 pt-24">
                <div className="text-2xl font-black">
                  One marketplace. Many ways to say I care.
                </div>
                <div className="mt-2 text-sm text-slate-300">
                  Select a destination and discover available gifts.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="border-b border-white/10 bg-[#091426]">
        <div className="mx-auto max-w-7xl px-5 py-8">
          <div className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
            Where are you sending?
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {countries.map((country) => (
              <button
                key={country.name}
                onClick={() => {
                  setSelectedCountry(country.name);
                  setSelectedCategory("All");
                }}
                className={`flex min-w-fit items-center gap-2 rounded-full border px-5 py-3 text-sm font-bold transition ${
                  selectedCountry === country.name
                    ? "border-blue-400 bg-blue-500/20 text-white"
                    : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                }`}
              >
                <span className="text-xl">{country.flag}</span>
                {country.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="mx-auto max-w-7xl px-5 py-16">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
              Shop by category
            </div>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Find the perfect surprise
            </h2>
          </div>

          <button
            onClick={() => setSelectedCategory("All")}
            className="hidden rounded-lg border border-white/10 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 sm:block"
          >
            View all
          </button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => {
                setSelectedCategory(category.name);
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              className={`group rounded-2xl border p-5 text-left transition hover:-translate-y-1 ${
                selectedCategory === category.name
                  ? "border-blue-400 bg-blue-500/10"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]"
              }`}
            >
              <div className="mb-5 text-4xl">{category.icon}</div>
              <div className="text-lg font-black">{category.name}</div>
              <div className="mt-2 text-sm leading-6 text-slate-400">
                {category.text}
              </div>
              <div className="mt-5 text-sm font-bold text-blue-300">
                Explore →
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="border-y border-white/10 bg-[#091426]">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="mb-8">
            <div className="text-sm font-bold uppercase tracking-[0.2em] text-pink-300">
              Marketplace
            </div>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              Gifts available for {selectedCountry}
            </h2>
          </div>

          {/* SEARCH */}
          <div className="mb-8 flex flex-col gap-3 md:flex-row">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search flowers, pizza, rings, cakes..."
              className="w-full rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-blue-400"
            />

            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="rounded-xl border border-white/10 px-6 py-4 font-bold text-slate-300 hover:bg-white/5"
            >
              Clear filters
            </button>
          </div>

          {selectedCategory !== "All" && (
            <div className="mb-6 flex items-center gap-3">
              <span className="rounded-full bg-blue-500/15 px-4 py-2 text-sm font-bold text-blue-300">
                {selectedCategory}
              </span>
              <button
                onClick={() => setSelectedCategory("All")}
                className="text-sm text-slate-400 underline"
              >
                Remove filter
              </button>
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 p-12 text-center">
              <div className="text-4xl">🔎</div>
              <h3 className="mt-4 text-xl font-black">
                No products found yet
              </h3>
              <p className="mt-2 text-slate-400">
                More vendors and products will appear as the marketplace
                grows.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearch("");
                }}
                className="mt-5 rounded-lg bg-white px-5 py-3 font-bold text-slate-950"
              >
                View all products
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] transition hover:-translate-y-1 hover:border-white/20"
                >
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="block w-full text-left"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-bold backdrop-blur">
                        {product.country}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="text-xs font-bold uppercase tracking-wider text-blue-300">
                        {product.category}
                      </div>

                      <h3 className="mt-2 line-clamp-2 text-lg font-black">
                        {product.name}
                      </h3>

                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-400">
                        {product.description}
                      </p>

                      <div className="mt-5 flex items-end justify-between">
                        <div>
                          <div className="text-xs text-slate-500">
                            Starting from
                          </div>
                          <div className="text-xl font-black">
                            {product.currency} {product.price}
                          </div>
                        </div>

                        <span className="text-sm font-bold text-blue-300">
                          View →
                        </span>
                      </div>
                    </div>
                  </button>

                  <div className="px-5 pb-5">
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full rounded-xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-200"
                    >
                      Add to cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-16">
        <div className="text-center">
          <div className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
            Simple process
          </div>
          <h2 className="mt-2 text-3xl font-black sm:text-4xl">
            Send a gift in four steps
          </h2>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-4">
          {[
            ["01", "Choose a destination", "Select where your gift needs to go."],
            ["02", "Choose a gift", "Browse products from marketplace vendors."],
            ["03", "Confirm your order", "Tell us about the recipient and occasion."],
            ["04", "We coordinate delivery", "Vendor preparation and delivery follow-up."],
          ].map(([number, title, text]) => (
            <div
              key={number}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
            >
              <div className="text-sm font-black text-blue-300">{number}</div>
              <h3 className="mt-5 text-lg font-black">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* VENDOR CTA */}
      <section className="border-y border-white/10 bg-gradient-to-r from-blue-500/10 to-pink-500/10">
        <div className="mx-auto max-w-7xl px-5 py-16">
          <div className="rounded-3xl border border-white/10 bg-black/20 p-8 md:p-12">
            <div className="max-w-2xl">
              <div className="text-sm font-bold uppercase tracking-[0.2em] text-pink-300">
                For local businesses
              </div>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Become a Global Link Express vendor
              </h2>
              <p className="mt-4 leading-7 text-slate-300">
                Flowers, restaurants, bakeries, jewelry stores and gift
                businesses can eventually list products and receive orders
                through the marketplace.
              </p>

              <button
                onClick={() =>
                  alert(
                    "Vendor registration will be connected to the marketplace backend in the next development stage."
                  )
                }
                className="mt-7 rounded-xl bg-white px-6 py-4 font-black text-slate-950"
              >
                Become a Vendor →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-5 py-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 md:flex-row md:items-center">
          <div>
            <div className="font-black">GLOBAL LINK EXPRESS</div>
            <div className="mt-1 text-sm text-slate-500">
              Your global gift marketplace.
            </div>
          </div>

          <button
            onClick={() => orderOnWhatsApp()}
            className="rounded-xl bg-green-500 px-5 py-3 font-black text-black"
          >
            WhatsApp: 09132056011
          </button>
        </div>
      </footer>

      {/* PRODUCT MODAL */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0b1729]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="h-72 w-full object-cover sm:h-96"
              />

              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute right-4 top-4 rounded-full bg-black/70 px-4 py-2 text-xl backdrop-blur"
              >
                ×
              </button>
            </div>

            <div className="p-7">
              <div className="text-sm font-bold uppercase tracking-wider text-blue-300">
                {selectedProduct.category}
              </div>

              <h2 className="mt-2 text-3xl font-black">
                {selectedProduct.name}
              </h2>

              <p className="mt-4 leading-7 text-slate-300">
                {selectedProduct.description}
              </p>

              <div className="mt-5 text-sm text-slate-400">
                Marketplace vendor:{" "}
                <span className="font-bold text-white">
                  {selectedProduct.vendor}
                </span>
              </div>

              <div className="mt-7 rounded-2xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-sm leading-6 text-yellow-100">
                <strong>Price notice:</strong> This is a prototype listing.
                Final vendor price and delivery fee must be confirmed before
                payment.
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => addToCart(selectedProduct)}
                  className="flex-1 rounded-xl bg-white px-5 py-4 font-black text-slate-950"
                >
                  🛒 Add to Cart
                </button>

                <button
                  onClick={() => orderOnWhatsApp(selectedProduct)}
                  className="flex-1 rounded-xl bg-green-500 px-5 py-4 font-black text-black"
                >
                  WhatsApp Vendor Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CART */}
      {showCart && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm"
          onClick={() => setShowCart(false)}
        >
          <div
            className="h-full w-full max-w-md overflow-y-auto border-l border-white/10 bg-[#081321] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">Your Cart</h2>
              <button
                onClick={() => setShowCart(false)}
                className="rounded-lg border border-white/10 px-3 py-2"
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="py-20 text-center">
                <div className="text-5xl">🛒</div>
                <h3 className="mt-4 font-black">Your cart is empty</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Add a gift from the marketplace.
                </p>
              </div>
            ) : (
              <>
                <div className="mt-7 space-y-4">
                  {cart.map((item, index) => (
                    <div
                      key={`${item.id}-${index}`}
                      className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 rounded-xl object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <div className="font-bold">{item.name}</div>
                        <div className="mt-1 text-sm text-slate-400">
                          {item.currency} {item.price}
                        </div>
                        <button
                          onClick={() => removeFromCart(index)}
                          className="mt-2 text-xs text-red-300"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-t border-white/10 pt-6">
                  <div className="mb-4 text-sm leading-6 text-slate-400">
                    Final vendor availability, delivery charges and payment
                    amount will be confirmed before a real transaction.
                  </div>

                  <button
                    onClick={() => orderOnWhatsApp()}
                    className="w-full rounded-xl bg-green-500 px-5 py-4 font-black text-black"
                  >
                    Continue via WhatsApp →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </main>
  );
}