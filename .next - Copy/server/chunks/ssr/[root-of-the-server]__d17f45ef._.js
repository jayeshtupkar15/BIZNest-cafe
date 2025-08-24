module.exports = [
"[project]/cafe-management-system/.next-internal/server/app/customer/page/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/cafe-management-system/app/favicon.ico.mjs { IMAGE => \"[project]/cafe-management-system/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/cafe-management-system/app/favicon.ico.mjs { IMAGE => \"[project]/cafe-management-system/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/cafe-management-system/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/cafe-management-system/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/cafe-management-system/app/customer/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "Category",
    ()=>Category,
    "ScrollButtons",
    ()=>ScrollButtons,
    "coffeeItems",
    ()=>coffeeItems,
    "dessertItems",
    ()=>dessertItems
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$cafe$2d$management$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/cafe-management-system/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
;
const coffeeItems = [
    {
        id: 1,
        name: "Lungo Coffee",
        description: "An espresso coffee drink topped with a small foam layer",
        price: 199,
        category: "coffee",
        image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=800&q=60"
    },
    {
        id: 2,
        name: "Dalgona Coffee",
        description: "Whipped coffee made using instant coffee and milk",
        price: 159,
        category: "coffee",
        image: "https://images.unsplash.com/photo-1600891964486-6b3b0b39a2f0?auto=format&fit=crop&w=800&q=60"
    },
    {
        id: 3,
        name: "Iced Coffee",
        description: "Cold brewed coffee served with ice and milk",
        price: 149,
        category: "coffee",
        image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=60"
    },
    {
        id: 4,
        name: "Filter Coffee",
        description: "Classic filter coffee, freshly brewed",
        price: 59,
        category: "coffee",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=60"
    }
];
const dessertItems = [
    {
        id: 101,
        name: "Gulab Jamun",
        description: "Milk-based sweet soaked in sugar syrup",
        price: 199,
        category: "dessert",
        image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=800&q=60"
    },
    {
        id: 102,
        name: "Chocolate Tiramisu",
        description: "Layers of mascarpone cream & chocolate",
        price: 250,
        category: "dessert",
        image: "https://images.unsplash.com/photo-1604908177522-02b9ea2d9d0b?auto=format&fit=crop&w=800&q=60"
    },
    {
        id: 103,
        name: "Churros",
        description: "Fried dough coated with sugar & cinnamon",
        price: 170,
        category: "dessert",
        image: "https://images.unsplash.com/photo-1546539787-0e4b3b8f7b82?auto=format&fit=crop&w=800&q=60"
    },
    {
        id: 104,
        name: "Australian Lamingtons",
        description: "Sponge cake coated in chocolate & coconut",
        price: 280,
        category: "dessert",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=60"
    }
];
function Card({ item, onAdd }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafe$2d$management$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "min-w-[280px] max-w-[340px] bg-white rounded-xl shadow-lg overflow-hidden flex-shrink-0 transition-transform hover:scale-105",
        style: {
            scrollSnapAlign: "center"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafe$2d$management$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafe$2d$management$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: item.image,
                        alt: item.name,
                        className: "w-full h-52 object-cover transition-transform duration-300 hover:scale-110"
                    }, void 0, false, {
                        fileName: "[project]/cafe-management-system/app/customer/page.tsx",
                        lineNumber: 100,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafe$2d$management$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        "aria-label": "favorite",
                        className: "absolute top-4 right-4 bg-white/80 p-2 rounded-full shadow-md text-xl text-gray-500 transition hover:text-red-500",
                        children: "♥"
                    }, void 0, false, {
                        fileName: "[project]/cafe-management-system/app/customer/page.tsx",
                        lineNumber: 105,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafe$2d$management$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "absolute left-4 bottom-4 bg-white/90 px-4 py-2 rounded-full text-lg font-bold shadow-md",
                        children: [
                            "₹",
                            item.price
                        ]
                    }, void 0, true, {
                        fileName: "[project]/cafe-management-system/app/customer/page.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cafe-management-system/app/customer/page.tsx",
                lineNumber: 99,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafe$2d$management$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafe$2d$management$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-xl font-bold",
                        children: item.name
                    }, void 0, false, {
                        fileName: "[project]/cafe-management-system/app/customer/page.tsx",
                        lineNumber: 116,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafe$2d$management$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-600 mt-2",
                        children: item.description
                    }, void 0, false, {
                        fileName: "[project]/cafe-management-system/app/customer/page.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafe$2d$management$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: ()=>onAdd(item),
                        className: "mt-4 w-full bg-[#3b2b20] text-white font-semibold py-3 rounded-full transition transform hover:scale-95",
                        children: "Add to Cart"
                    }, void 0, false, {
                        fileName: "[project]/cafe-management-system/app/customer/page.tsx",
                        lineNumber: 118,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/cafe-management-system/app/customer/page.tsx",
                lineNumber: 115,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cafe-management-system/app/customer/page.tsx",
        lineNumber: 95,
        columnNumber: 5
    }, this);
}
function ScrollButtons({ scrollRef }) {
    const scroll = (dir)=>{
        if (!scrollRef.current) return;
        const amount = scrollRef.current.clientWidth * 0.8;
        scrollRef.current.scrollBy({
            left: dir === "left" ? -amount : amount,
            behavior: "smooth"
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafe$2d$management$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-2 md:px-0",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafe$2d$management$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                "aria-label": "scroll left",
                onClick: ()=>scroll("left"),
                className: "w-12 h-12 rounded-full bg-white/80 shadow-lg flex items-center justify-center text-2xl text-gray-700 transition transform hover:scale-110",
                children: "‹"
            }, void 0, false, {
                fileName: "[project]/cafe-management-system/app/customer/page.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafe$2d$management$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                "aria-label": "scroll right",
                onClick: ()=>scroll("right"),
                className: "w-12 h-12 rounded-full bg-white/80 shadow-lg flex items-center justify-center text-2xl text-gray-700 transition transform hover:scale-110",
                children: "›"
            }, void 0, false, {
                fileName: "[project]/cafe-management-system/app/customer/page.tsx",
                lineNumber: 145,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cafe-management-system/app/customer/page.tsx",
        lineNumber: 137,
        columnNumber: 5
    }, this);
}
function Category({ icon, label }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafe$2d$management$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col items-center gap-2 transition transform hover:scale-110",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafe$2d$management$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-3xl",
                children: icon
            }, void 0, false, {
                fileName: "[project]/cafe-management-system/app/customer/page.tsx",
                lineNumber: 160,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$cafe$2d$management$2d$system$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "text-sm font-medium",
                children: label
            }, void 0, false, {
                fileName: "[project]/cafe-management-system/app/customer/page.tsx",
                lineNumber: 163,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/cafe-management-system/app/customer/page.tsx",
        lineNumber: 159,
        columnNumber: 5
    }, this);
}
}),
"[project]/cafe-management-system/app/customer/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/cafe-management-system/app/customer/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__d17f45ef._.js.map