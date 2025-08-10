import React from "react";
import useLocalStorage from "../utils/useLocalStorage";
import InventoryForm from "../components/InventoryForm";
import InventoryTable from "../components/InventoryTable";

export default function Home() {
  const [items, setItems] = useLocalStorage("atoz_items_v1", []);

  const addOrUpdate = (entry) => {
    // if item with same name exists, update purchase/sold/mrp/cost accumulative
    setItems(prev => {
      const idx = prev.findIndex(p => p.itemName.trim().toLowerCase() === entry.itemName.trim().toLowerCase());
      if (idx === -1) {
        return [entry, ...prev].slice(0, 1000); // limit large
      } else {
        const newArr = [...prev];
        const existing = newArr[idx];
        existing.purchaseQty = (existing.purchaseQty || 0) + (entry.purchaseQty || 0);
        existing.soldQty = (existing.soldQty || 0) + (entry.soldQty || 0);
        existing.mrp = entry.mrp || existing.mrp;
        existing.cost = entry.cost || existing.cost;
        existing.updatedAt = new Date().toISOString();
        newArr[idx] = existing;
        return newArr;
      }
    });
  };

  const deleteItem = (id) => {
    setItems(prev => prev.filter(p => p.id !== id));
  };

  const sellOne = (id) => {
    setItems(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, soldQty: (p.soldQty || 0) + 1 };
      }
      return p;
    }));
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">A to Z Medical Stores — Inventory (Preview)</h1>
          <div className="text-sm">Preview Mode</div>
        </header>

        <InventoryForm onAdd={addOrUpdate} />
        <InventoryTable items={items} onDelete={deleteItem} onSell={sellOne} />

        <div className="mt-4 text-sm text-gray-600">
          <strong>Note:</strong> This is a client-side preview. Data is saved in your browser only. For multi-device & team access we will add backend + DB in the next update.
        </div>
      </div>
    </div>
  );
}
