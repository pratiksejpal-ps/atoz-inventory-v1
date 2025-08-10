import React, { useState } from "react";

export default function InventoryForm({ onAdd }) {
  const [item, setItem] = useState("");
  const [purchaseQty, setPurchaseQty] = useState("");
  const [soldQty, setSoldQty] = useState("");
  const [mrp, setMrp] = useState("");
  const [cost, setCost] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!item) return;
    onAdd({
      id: Date.now(),
      itemName: item,
      purchaseQty: Number(purchaseQty || 0),
      soldQty: Number(soldQty || 0),
      mrp: Number(mrp || 0),
      cost: Number(cost || 0),
      createdAt: new Date().toISOString()
    });
    setItem(""); setPurchaseQty(""); setSoldQty(""); setMrp(""); setCost("");
  };

  return (
    <form className="bg-white p-4 rounded shadow mb-4" onSubmit={submit}>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
        <input className="p-2 border rounded" placeholder="Item name" value={item} onChange={e=>setItem(e.target.value)} />
        <input className="p-2 border rounded" type="number" placeholder="Purchase Qty" value={purchaseQty} onChange={e=>setPurchaseQty(e.target.value)} />
        <input className="p-2 border rounded" type="number" placeholder="Sold Qty" value={soldQty} onChange={e=>setSoldQty(e.target.value)} />
        <input className="p-2 border rounded" type="number" placeholder="MRP" value={mrp} onChange={e=>setMrp(e.target.value)} />
        <input className="p-2 border rounded" type="number" placeholder="Cost/Unit" value={cost} onChange={e=>setCost(e.target.value)} />
      </div>
      <div className="mt-3">
        <button className="bg-brandRed text-white px-4 py-2 rounded">Add / Update Item</button>
      </div>
    </form>
  );
}
