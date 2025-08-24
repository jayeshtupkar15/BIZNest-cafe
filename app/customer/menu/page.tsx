"use client";
import React, { useRef, useState, useEffect, RefObject } from "react";

import Navbar from "../../../components/Navbar";
import CategoryBar from "../../../components/CategoryBar";
import MenuCard from "../../../components/MenuCard";
import ItemModal from "../../../components/ItemModal";
import ScrollButtons from "../../../components/ScrollButtons";
import Toast from "../../../components/Toast";
import Footer from "../../../components/Footer";

// -------------------- Types --------------------
export type MenuItem = {
  id: number; // local numeric id used only on the client for cart/keys
  name: string;
  description: string;
  price: number;
  category: string;
  image: string; // ✅ unified to image only
  calories?: number;
  ingredients?: string[];
  allergens?: string[];
  dietary?: string[];
};

// -------------------- Menu Data (static/seed) --------------------
const seedItems: MenuItem[] = [
  // Coffee
  {
    id: 1,
    name: "Classic Cappuccino",
    description: "Rich espresso with velvety steamed milk foam.",
    price: 399,
    category: "Coffee",
    image:
      "https://tse3.mm.bing.net/th/id/OIP.Yqve00ix53LnxeurA5dEmAHaEu?pid=Api&P=0&h=180",
    calories: 120,
    ingredients: ["Espresso", "Steamed milk", "Milk foam"],
    allergens: ["Dairy"],
    dietary: ["Vegetarian"],
  },
  {
    id: 2,
    name: "Intense Espresso",
    description: "A pure, concentrated shot of premium coffee.",
    price: 299,
    category: "Coffee",
    image:
      "https://img.freepik.com/premium-photo/invigorating-blend-amaretto-coffee-indulgence-perfect-fusion-intense-espresso-luscio_981640-2460.jpg",
    calories: 5,
    ingredients: ["Premium coffee beans", "Water"],
    allergens: [],
    dietary: ["Vegan", "Gluten-Free"],
  },
  {
    id: 3,
    name: "Caramel Macchiato",
    description: "Steamed milk, espresso, and caramel drizzle.",
    price: 450,
    category: "Coffee",
    image:
      "http://primulaproducts.com/cdn/shop/articles/MicrosoftTeams-image_1200x1200.png?v=1721058565",
    calories: 250,
    ingredients: ["Espresso", "Steamed milk", "Caramel syrup", "Whipped cream"],
    allergens: ["Dairy"],
    dietary: ["Vegetarian"],
  },
  {
    id: 4,
    name: "Iced Americano",
    description: "Espresso topped with cold water, served over ice.",
    price: 350,
    category: "Coffee",
    image:
      "https://mocktail.net/wp-content/uploads/2022/05/homemade-Iced-Americano-recipe_4.jpg",
    calories: 10,
    ingredients: ["Espresso", "Cold water", "Ice"],
    allergens: [],
    dietary: ["Vegan", "Gluten-Free"],
  },
  {
  id: 5,
  name: "Flat White",
  description: "Velvety espresso with microfoam milk for a smooth texture.",
  price: 380,
  category: "Coffee",
  image: "https://www.coffeebeans.ph/storage/2023/04/Flat-White-Coffee-1024x768.jpg",
  calories: 130,
  ingredients: ["Espresso", "Steamed Milk"],
  allergens: ["Dairy"],
  dietary: ["Vegetarian"],
},
{
  id: 6,
  name: "Mocha Latte",
  description: "Espresso blended with chocolate and steamed milk, topped with whipped cream.",
  price: 420,
  category: "Coffee",
  image: "https://midwestniceblog.com/wp-content/uploads/2023/06/recipe-for-mocha-latte.jpg",
  calories: 230,
  ingredients: ["Espresso", "Steamed Milk", "Chocolate Syrup", "Whipped Cream"],
  allergens: ["Dairy"],
  dietary: ["Vegetarian"],
},
{
  id: 7,
  name: "Ristretto",
  description: "A short, concentrated shot of espresso with intense flavor.",
  price: 310,
  category: "Coffee",
  image: "http://cdn.shopify.com/s/files/1/0590/4531/4737/articles/ristretto.png?v=1677058199",
  calories: 5,
  ingredients: ["Espresso"],
  allergens: [],
  dietary: ["Vegan", "Gluten-Free"],
},
{
  id: 8,
  name: "Irish Coffee",
  description: "Coffee mixed with Irish whiskey, sugar, and topped with cream.",
  price: 480,
  category: "Coffee",
  image: "https://somuchfoodblog.com/wp-content/uploads/2022/11/irish-coffee6.jpg",
  calories: 250,
  ingredients: ["Espresso", "Irish Whiskey", "Sugar", "Whipped Cream"],
  allergens: ["Dairy"],
  dietary: ["Vegetarian"],
},
{
  id: 9,
  name: "Café au Lait",
  description: "Equal parts brewed coffee and steamed milk for a balanced taste.",
  price: 360,
  category: "Coffee",
  image: "https://www.thespruceeats.com/thmb/YEI_JAfLHd6fbfCYUukcW5E2TYg=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-cafe-au-lait-recipe-1374920-hero-01-b1463e806a7947e7b8b17979ab70eab3.jpg",
  calories: 120,
  ingredients: ["Brewed Coffee", "Steamed Milk"],
  allergens: ["Dairy"],
  dietary: ["Vegetarian"],
},
{
  id: 10,
  name: "Honey Cinnamon Latte",
  description: "Espresso with steamed milk, honey, and a hint of cinnamon.",
  price: 400,
  category: "Coffee",
  image: "https://elisetriestocook.com/wp-content/uploads/2022/08/Honey-Cinnamon-Latte-1913-1024x1536.jpg",
  calories: 180,
  ingredients: ["Espresso", "Steamed Milk", "Honey", "Cinnamon"],
  allergens: ["Dairy"],
  dietary: ["Vegetarian"],
},


  // Cafe Items
  {
    id: 10,
    name: "Signature Club Sandwich",
    description: "Triple-decker with grilled chicken, bacon, lettuce, tomato.",
    price: 550,
    category: "Cafe",
    image:
      "https://deliverlogic-common-assets.s3.amazonaws.com/editable/images/chowcall/menuitems/19017.jpg",
    calories: 680,
    ingredients: [
      "Grilled chicken",
      "Bacon",
      "Lettuce",
      "Tomato",
      "Mayo",
      "Bread",
    ],
    allergens: ["Gluten", "Eggs"],
    dietary: ["High Protein"],
  },
  {
    id: 11,
    name: "Avocado Toast Deluxe",
    description: "Sourdough with avocado, feta, and chili flakes.",
    price: 400,
    category: "Cafe",
    image:
      "http://static1.squarespace.com/static/61e7443d8270c01ce2239916/t/6219600a07429c5f45965a6a/1645830154987/_DSC6330.jpg?format=1500w",
    calories: 420,
    ingredients: [
      "Sourdough bread",
      "Avocado",
      "Feta cheese",
      "Chili flakes",
      "Olive oil",
    ],
    allergens: ["Gluten", "Dairy"],
    dietary: ["Vegetarian", "Healthy Choice"],
  },
  {
    id: 12,
    name: "Quiche Lorraine",
    description: "Savory tart with eggs, bacon, and Gruyère cheese.",
    price: 420,
    category: "Cafe",
    image:
      "https://www.simplyrecipes.com/thmb/rfneTPyP3cUFVJ06Uqs9p5OkDOk=/3900x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Quiche-Lorraine-LEAD-4-bbc2620b4ce444629038f602b6f1b533.jpg",
    calories: 380,
    ingredients: ["Eggs", "Bacon", "Gruyère cheese", "Pastry", "Cream"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    dietary: ["High Protein"],
  },
  {
  id: 13,
  name: "Mediterranean Panini",
  description: "Grilled panini with roasted vegetables, mozzarella, and pesto.",
  price: 450,
  category: "Cafe",
  image: "https://tse3.mm.bing.net/th/id/OIP._f0XdPMiInqPxcEFvaJR1wHaEn?pid=Api&P=0&h=180",
  calories: 520,
  ingredients: ["Ciabatta bread", "Roasted vegetables", "Mozzarella", "Pesto"],
  allergens: ["Gluten", "Dairy"],
  dietary: ["Vegetarian"],
},
{
  id: 14,
  name: "Smoked Salmon Bagel",
  description: "Bagel with cream cheese, smoked salmon, and capers.",
  price: 500,
  category: "Cafe",
  image: "https://www.lemonblossoms.com/wp-content/uploads/2023/05/Smoked-Salmon-Bagel-S1-750x750.jpg",
  calories: 450,
  ingredients: ["Bagel", "Cream cheese", "Smoked salmon", "Capers", "Onion"],
  allergens: ["Gluten", "Dairy", "Fish"],
  dietary: ["High Protein"],
},
{
  id: 15,
  name: "Veggie Burrito",
  description: "Whole wheat tortilla with beans, rice, veggies, and salsa.",
  price: 380,
  category: "Cafe",
  image: "http://assets.epicurious.com/photos/57978b27c9298e54495917d5/master/pass/black-bean-and-vegetable-burritos.jpg",
  calories: 400,
  ingredients: ["Whole wheat tortilla", "Black beans", "Rice", "Bell peppers", "Salsa"],
  allergens: ["Gluten"],
  dietary: ["Vegan", "Gluten-Free Option"],
},
{
  id: 16,
  name: "Chicken Caesar Wrap",
  description: "Grilled chicken, romaine, parmesan, and Caesar dressing in a wrap.",
  price: 470,
  category: "Cafe",
  image: "https://insanelygoodrecipes.com/wp-content/uploads/2024/05/Chicken-Caesar-Wrap-in-a-Wooden-Board-800x530.jpg",
  calories: 520,
  ingredients: ["Tortilla", "Grilled chicken", "Romaine lettuce", "Parmesan", "Caesar dressing"],
  allergens: ["Gluten", "Dairy"],
  dietary: ["High Protein"],
},
{
  id: 17,
  name: "Caprese Sandwich",
  description: "Fresh mozzarella, tomatoes, basil, and balsamic glaze on ciabatta.",
  price: 420,
  category: "Cafe",
  image: "https://ohsweetbasil.com/wp-content/uploads/balsamic-glaze-grilled-caprese-sandwich-recipe-4-scaled.jpg",
  calories: 380,
  ingredients: ["Ciabatta bread", "Fresh mozzarella", "Tomatoes", "Basil", "Balsamic glaze"],
  allergens: ["Gluten", "Dairy"],
  dietary: ["Vegetarian"],
},
{
  id: 18,
  name: "Spicy Tuna Sandwich",
  description: "Tuna salad with jalapenos, lettuce, and tomato on multigrain bread.",
  price: 460,
  category: "Cafe",
  image: "https://www.goverden.com/uploads/recipes/spicy-tuna-sandwich-banner.jpg",
  calories: 480,
  ingredients: ["Multigrain bread", "Tuna", "Jalapenos", "Lettuce", "Tomato", "Mayo"],
  allergens: ["Gluten", "Eggs", "Fish"],
  dietary: ["High Protein"],
},
{
  id: 19,
  name: "Mediterranean Veggie Wrap",
  description: "Hummus, roasted veggies, feta, and greens in a tortilla wrap.",
  price: 400,
  category: "Cafe",
  image: "https://recipes.net/wp-content/uploads/2023/05/vegetarian-mediterranean-veggie-wrap-recipe_7bb0261b96ba6eb4c32cba94c8f5443b-500x500.jpeg",
  calories: 390,
  ingredients: ["Tortilla", "Hummus", "Roasted vegetables", "Feta", "Greens"],
  allergens: ["Gluten", "Dairy"],
  dietary: ["Vegetarian", "Healthy Choice"],
},


  // Burgers
  {
    id: 20,
    name: "Ultimate Cheeseburger",
    description:
      "Juicy Chicken patty, cheddar, lettuce, tomato & secret sauce.",
    price: 600,
    category: "Burgers",
    image: "https://www.sargento.com/assets/Uploads/Recipe/Image/burger_0.jpg",
    calories: 750,
    ingredients: [
      "Chicken patty",
      "Cheddar cheese",
      "Lettuce",
      "Tomato",
      "Special sauce",
      "Burger bun",
    ],
    allergens: ["Gluten", "Dairy"],
    dietary: ["High Protein"],
  },
  {
    id: 21,
    name: "Spicy Chicken Burger",
    description: "Crispy chicken breast with spicy slaw & pickles.",
    price: 580,
    category: "Burgers",
    image:
      "https://simply-delicious-food.com/wp-content/uploads/2018/11/spicy-chicken-burgers-3.jpg",
    calories: 650,
    ingredients: [
      "Chicken breast",
      "Spicy coating",
      "Coleslaw",
      "Pickles",
      "Mayo",
      "Burger bun",
    ],
    allergens: ["Gluten", "Eggs"],
    dietary: ["Spicy", "High Protein"],
  },
  {
    id: 22,
    name: "Mushroom Swiss Burger",
    description: "Beef patty with sautéed mushrooms & Swiss cheese.",
    price: 620,
    category: "Burgers",
    image:
      "https://d2lswn7b0fl4u2.cloudfront.net/photos/pg-mushroom-swiss-burger-1612796532.jpg",
    calories: 720,
    ingredients: [
      "Beef patty",
      "Swiss cheese",
      "Sautéed mushrooms",
      "Caramelized onions",
      "Burger bun",
    ],
    allergens: ["Gluten", "Dairy"],
    dietary: ["Gourmet", "High Protein"],
  },
  {
  id: 23,
  name: "BBQ Chicken Bacon Burger",
  description: "Juicy grilled chicken patty with crispy bacon, cheddar, and BBQ sauce.",
  price: 650,
  category: "Burgers",
  image: "https://img.freepik.com/premium-photo/hawaiian-bbq-chicken-bacon-burger-with-swiss-cheese_1234738-35095.jpg",
  calories: 720,
  ingredients: ["Chicken patty", "Cheddar cheese", "Bacon", "BBQ sauce", "Lettuce", "Burger bun"],
  allergens: ["Gluten", "Dairy"],
  dietary: ["High Protein", "Gourmet"],
},
{
  id: 24,
  name: "Veggie Delight Burger",
  description: "Grilled veggie patty with lettuce, tomato, and avocado spread.",
  price: 500,
  category: "Burgers",
  image: "https://www.noracooks.com/wp-content/uploads/2023/04/veggie-burgers-1-2.jpg",
  calories: 450,
  ingredients: ["Veggie patty", "Lettuce", "Tomato", "Avocado spread", "Burger bun"],
  allergens: ["Gluten"],
  dietary: ["Vegetarian", "Healthy Choice"],
},
{
  id: 25,
  name: "Spicy Chicken Jalapeno Burger",
  description: "Grilled chicken patty with jalapenos, pepper jack cheese, and spicy mayo.",
  price: 630,
  category: "Burgers",
  image: "https://www.tasteofhome.com/wp-content/uploads/2020/02/exps191474_SD153322B04_07_4b-2.jpg",
  calories: 700,
  ingredients: ["Chicken patty", "Pepper jack cheese", "Jalapenos", "Spicy mayo", "Burger bun"],
  allergens: ["Gluten", "Dairy"],
  dietary: ["Spicy", "High Protein"],
},
{
  id: 26,
  name: "Classic Chicken Burger",
  description: "Grilled chicken patty with lettuce, tomato, onion, and cheddar cheese.",
  price: 580,
  category: "Burgers",
  image: "https://tse2.mm.bing.net/th/id/OIP.VeNmJkqrAPjVULwOqrfeHAHaE8?pid=Api&P=0&h=180",
  calories: 650,
  ingredients: ["Chicken patty", "Cheddar cheese", "Lettuce", "Tomato", "Onion", "Burger bun"],
  allergens: ["Gluten", "Dairy"],
  dietary: ["High Protein"],
},
{
  id: 27,
  name: "Chicken Avocado Burger",
  description: "Grilled chicken patty with avocado, lettuce, tomato, and mayo.",
  price: 600,
  category: "Burgers",
  image: "https://www.recipetineats.com/wp-content/uploads/2019/08/Avocado-Chicken-Burgers_9.jpg",
  calories: 680,
  ingredients: ["Chicken patty", "Avocado", "Lettuce", "Tomato", "Mayo", "Burger bun"],
  allergens: ["Gluten", "Eggs"],
  dietary: ["High Protein", "Healthy Choice"],
},
{
  id: 28,
  name: "Buffalo Chicken Burger",
  description: "Crispy chicken tossed in buffalo sauce with lettuce and ranch dressing.",
  price: 620,
  category: "Burgers",
  image: "https://tse4.mm.bing.net/th/id/OIP.nPOS_xLqA9PF12Swm3IWgQHaE8?pid=Api&P=0&h=180",
  calories: 700,
  ingredients: ["Chicken patty", "Buffalo sauce", "Lettuce", "Ranch dressing", "Burger bun"],
  allergens: ["Gluten", "Dairy", "Eggs"],
  dietary: ["Spicy", "High Protein"],
},
{
  id: 29,
  name: "Falafel Burger",
  description: "Crispy falafel patty with hummus, lettuce, tomato, and pickles.",
  price: 520,
  category: "Burgers",
  image: "https://www.thebuddhistchef.com/wp-content/uploads/2016/05/falafel_burger.jpg",
  calories: 480,
  ingredients: ["Falafel patty", "Hummus", "Lettuce", "Tomato", "Pickles", "Burger bun"],
  allergens: ["Gluten"],
  dietary: ["Vegan", "Vegetarian"],
},


  // Desserts
  {
    id: 101,
    name: "Molten Chocolate Lava Cake",
    description:
      "Decadent chocolate cake with gooey center, served with ice cream.",
    price: 450,
    category: "Desserts",
    image:
      "https://i2.wp.com/www.livewellbakeoften.com/wp-content/uploads/2017/01/Molten-Chocolate-Lava-Cakes-for-Two-4.jpg?fit=1360%2C1360&ssl=1",
    calories: 520,
    ingredients: [
      "Dark chocolate",
      "Butter",
      "Eggs",
      "Sugar",
      "Flour",
      "Vanilla ice cream",
    ],
    allergens: ["Gluten", "Dairy", "Eggs"],
    dietary: ["Indulgent"],
  },
  {
    id: 102,
    name: "New York Cheesecake",
    description:
      "Classic cheesecake with graham cracker crust & berry compote.",
    price: 400,
    category: "Desserts",
    image:
      "https://img.taste.com.au/O8JC4F3Q/taste/2016/11/new-york-cheesecake-40742-1.jpeg",
    calories: 480,
    ingredients: [
      "Cream cheese",
      "Graham crackers",
      "Sugar",
      "Eggs",
      "Berry compote",
    ],
    allergens: ["Gluten", "Dairy", "Eggs"],
    dietary: ["Classic"],
  },
  {
    id: 103,
    name: "Tiramisu",
    description: "Layers of coffee-soaked ladyfingers with mascarpone.",
    price: 380,
    category: "Desserts",
    image:
      "https://www.flavoursholidays.co.uk/wp-content/uploads/2020/07/Tiramisu.jpg",
    calories: 350,
    ingredients: ["Ladyfingers", "Mascarpone", "Coffee", "Cocoa powder", "Sugar"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    dietary: ["Italian Classic"],
  },
  {
  id: 104,
  name: "Chocolate Brownie",
  description: "Rich and fudgy chocolate brownie with walnuts.",
  price: 320,
  category: "Desserts",
  image: "https://tse3.mm.bing.net/th/id/OIP.6Q4CKDXv_unO81Ts_FbzygHaLH?pid=Api&P=0&h=180",
  calories: 400,
  ingredients: ["Dark chocolate", "Butter", "Sugar", "Flour", "Eggs", "Walnuts"],
  allergens: ["Gluten", "Dairy", "Eggs", "Nuts"],
  dietary: ["Indulgent"],
},
{
  id: 105,
  name: "Strawberry Shortcake",
  description: "Layers of sponge cake with fresh strawberries and whipped cream.",
  price: 380,
  category: "Desserts",
  image: "https://www.tasteofhome.com/wp-content/uploads/2018/01/Best-Strawberry-Shortcake_EXPS_NDIYD19_37452_E04_15_1b-7.jpg",
  calories: 360,
  ingredients: ["Sponge cake", "Strawberries", "Whipped cream", "Sugar"],
  allergens: ["Gluten", "Dairy", "Eggs"],
  dietary: ["Vegetarian", "Fruity"],
},
{
  id: 106,
  name: "Banana Pudding",
  description: "Creamy banana pudding layered with wafers and whipped cream.",
  price: 350,
  category: "Desserts",
  image: "https://tse1.mm.bing.net/th/id/OIP.rr0zlA9CCc9Y6uf5v1N5igHaIQ?pid=Api&P=0&h=180",
  calories: 330,
  ingredients: ["Bananas", "Vanilla pudding", "Wafers", "Whipped cream"],
  allergens: ["Gluten", "Dairy", "Eggs"],
  dietary: ["Vegetarian"],
},
{
  id: 107,
  name: "Apple Crumble",
  description: "Warm apple dessert with cinnamon and crumbly topping.",
  price: 370,
  category: "Desserts",
  image: "https://sweetandsavorymeals.com/wp-content/uploads/2019/06/Classic-Apple-Crumble-Recipe-4-1024x1536.jpg",
  calories: 300,
  ingredients: ["Apples", "Sugar", "Cinnamon", "Butter", "Flour", "Oats"],
  allergens: ["Gluten", "Dairy"],
  dietary: ["Vegetarian", "Fruity"],
},
{
  id: 108,
  name: "Chocolate Chip Cookies",
  description: "Classic cookies loaded with chocolate chips.",
  price: 250,
  category: "Desserts",
  image: "https://www.onceuponachef.com/images/2021/11/Best-Chocolate-Chip-Cookies-1200x1499.jpg",
  calories: 280,
  ingredients: ["Flour", "Sugar", "Butter", "Eggs", "Chocolate chips"],
  allergens: ["Gluten", "Dairy", "Eggs"],
  dietary: ["Vegetarian", "Snack"],
},
{
  id: 109,
  name: "Lemon Tart",
  description: "Tangy lemon custard in a buttery crust.",
  price: 390,
  category: "Desserts",
  image: "https://tse3.mm.bing.net/th/id/OIP.U4tbt9MpieepAbC4ddDV3gHaHa?pid=Api&P=0&h=180",
  calories: 310,
  ingredients: ["Flour", "Butter", "Sugar", "Eggs", "Lemon juice", "Lemon zest"],
  allergens: ["Gluten", "Dairy", "Eggs"],
  dietary: ["Vegetarian", "Tangy"],
},
{
  id: 110,
  name: "Panna Cotta",
  description: "Creamy Italian dessert topped with berry sauce.",
  price: 420,
  category: "Desserts",
  image: "https://i0.wp.com/www.cosiitaliano.com/wp-content/uploads/2020/06/Panna-Cotta-with-Berries-scaled.jpg?fit=2560%2C1709&ssl=1",
  calories: 320,
  ingredients: ["Cream", "Sugar", "Gelatin", "Vanilla extract", "Berry sauce"],
  allergens: ["Dairy"],
  dietary: ["Vegetarian", "Italian Classic"],
},

];

// -------------------- Helper: stable numeric id from string --------------------
function numericIdFromString(s: string, offset = 200000): number {
  let hash = 0;
  for (let i = 0; i < s.length; i++) {
    hash = (hash << 5) - hash + s.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) + offset;
}

// -------------------- Main Component --------------------
export default function MenuPage() {
  // Refs for CategoryBar (unchanged UI)
  const categoryRefs: { [key: string]: RefObject<HTMLDivElement> } = {
    Coffee: useRef<HTMLDivElement>(null!),
    Cafe: useRef<HTMLDivElement>(null!),
    Burgers: useRef<HTMLDivElement>(null!),
    Desserts: useRef<HTMLDivElement>(null!),
  };

  // Cart & UI state (unchanged)
  const [cart, setCart] = useState<{ item: MenuItem; quantity: number }[]>([]);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [toast, setToast] = useState({ message: "", isVisible: false });
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // DB items (appended after seedItems)
  const [dbItems, setDbItems] = useState<MenuItem[]>([]);
  const [isLoadingDb, setIsLoadingDb] = useState<boolean>(false);
  const [dbError, setDbError] = useState<string | null>(null);

  // Hydrate cart from localStorage
  useEffect(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCart(savedCart);
    } catch (error) {
      console.error("Failed to parse cart from localStorage", error);
    }
  }, []);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Toast auto-hide
  useEffect(() => {
    if (toast.isVisible) {
      const timer = setTimeout(
        () => setToast({ ...toast, isVisible: false }),
        3000
      );
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // Fetch extra menu items from DB and append after the static items
  useEffect(() => {
    let cancelled = false;
    async function loadDbItems() {
      try {
        setIsLoadingDb(true);
        setDbError(null);

        const res = await fetch("/api/menu", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to load menu from API");

        const data = await res.json();
        if (cancelled) return;

        // Expecting server to return { image: string } only (no imageUrl).
        // Filter out items without a usable image or name.
        const mapped: MenuItem[] = (Array.isArray(data) ? data : [])
          .filter((doc: any) => !!doc && !!doc.name && !!doc.image)
          .map((doc: any) => {
            const id = numericIdFromString(String(doc._id ?? doc.name));
            return {
              id,
              name: String(doc.name),
              description: String(doc.description ?? ""),
              price: Number(doc.price ?? 0),
              category: String(doc.category ?? "Others"),
              image: String(doc.image), // ✅ only image
              calories:
                typeof doc.calories === "number" ? doc.calories : undefined,
              ingredients: Array.isArray(doc.ingredients)
                ? doc.ingredients.map(String)
                : undefined,
              allergens: Array.isArray(doc.allergens)
                ? doc.allergens.map(String)
                : undefined,
              dietary: Array.isArray(doc.dietary)
                ? doc.dietary.map(String)
                : undefined,
            } as MenuItem;
          });

        setDbItems(mapped);
      } catch (e: any) {
        console.error(e);
        setDbError(e?.message || "Something went wrong loading menu");
      } finally {
        if (!cancelled) setIsLoadingDb(false);
      }
    }

    loadDbItems();
    return () => {
      cancelled = true;
    };
  }, []);

  // Toast helper
  const showToast = (message: string) => {
    setToast({ message, isVisible: false });
    setTimeout(() => setToast({ message, isVisible: true }), 10);
  };

  // Item interactions (unchanged)
  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleAddToCart = (item: MenuItem) => {
    const qty = quantities[item.id] || 1;
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((c) => c.item.id === item.id);
      if (existingIndex >= 0) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += qty;
        return updated;
      }
      return [...prevCart, { item, quantity: qty }];
    });
    showToast(`${item.name} (x${qty}) added to cart!`);
    setQuantities((prev) => ({ ...prev, [item.id]: 1 }));
  };

  const incrementQty = (id: number) =>
    setQuantities((prev) => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
  const decrementQty = (id: number) =>
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));

  const totalCartItems = cart.reduce((sum, cur) => sum + cur.quantity, 0);

  // Combined items: static first, then DB items
  const combinedItems: MenuItem[] = [...seedItems, ...dbItems];

  // Renderer (unchanged UI)
  const renderCategory = (category: string, ref: RefObject<HTMLDivElement>) => {
    const items = combinedItems.filter((i) => i.category === category);
    if (!items.length) return null;

    return (
      <section
        id={category.toLowerCase()}
        ref={ref}
        className="max-w-7xl mx-auto px-6 py-16 scroll-mt-40"
      >
        <div className="text-center mb-12">
          <h2 className="text-5xl font-black mb-4 bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent">
            {category}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
        </div>
        <div className="relative">
          <div
            className="flex gap-8 overflow-x-auto no-scrollbar pb-8 scroll-smooth"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {items.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                quantity={quantities[item.id] || 1}
                onIncrement={() => incrementQty(item.id)}
                onDecrement={() => decrementQty(item.id)}
                onAdd={() => handleAddToCart(item)}
                onClick={() => handleItemClick(item)}
              />
            ))}
          </div>
          <ScrollButtons scrollRef={ref} />
        </div>
      </section>
    );
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50 min-h-screen">
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.5s
            cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
      `}</style>

      {/* Navbar with cartCount */}
      <Navbar cartCount={totalCartItems} />

      {/* Hero Section */}
      <div
        className="relative pt-28 pb-20 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/1200x/ee/10/a5/ee10a5c6589656649097ffbbf102e7ec.jpg')",
        }}
      >
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-3xl opacity-15 animate-pulse delay-700"></div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent leading-tight drop-shadow-lg">
              Our Menu
            </h1>
            <div className="w-32 h-2 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 mx-auto mb-8 rounded-full shadow-lg"></div>

            {/* Tagline */}
            <p className="text-2xl md:text-3xl text-gray-100 font-light max-w-4xl mx-auto leading-relaxed drop-shadow-lg">
              "Discover culinary excellence crafted with passion, featuring
              premium ingredients and bold flavors." "Savor wholesome,
              health-conscious meals made with love for your well-being." "Good
              food, great taste — nourishing body and soul."
            </p>
          </div>
        </div>
      </div>

      {/* CategoryBar still receives refs prop (as your component expects) */}
      <CategoryBar refs={categoryRefs} />

      <main className="relative z-10">
        {renderCategory("Coffee", categoryRefs.Coffee)}
        {renderCategory("Cafe", categoryRefs.Cafe)}
        {renderCategory("Burgers", categoryRefs.Burgers)}
        {renderCategory("Desserts", categoryRefs.Desserts)}

        {/* Small status message for DB loading/errors (non-intrusive) */}
        {(isLoadingDb || dbError) && (
          <div className="max-w-7xl mx-auto px-6 pb-4 text-sm text-gray-500">
            {isLoadingDb && <span>Loading more items…</span>}
            {dbError && <span className="text-red-500">({dbError})</span>}
          </div>
        )}
      </main>

      <ItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedItem(null);
        }}
        onAddToCart={handleAddToCart}
        quantity={selectedItem ? quantities[selectedItem.id] || 1 : 1}
        onIncrement={() => selectedItem && incrementQty(selectedItem.id)}
        onDecrement={() => selectedItem && decrementQty(selectedItem.id)}
      />

      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onDismiss={() => setToast({ ...toast, isVisible: false })}
      />

      <Footer />

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-delay {
          animation: fadeIn 0.8s ease-out forwards 0.3s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
