import React from "react";

function calcRemaining(item) {
  return (item.purchaseQty || 0) - (item.soldQty || 0);
}
function calcProfit(item) {
  return (item.soldQty || 0) * ((item.mrp || 0) - (item.cost || 0));
}

export default function InventoryTable({ items, onDelete, onSell }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="text-left">
              <th className="p-2">Item</th>
              <th className="p-2">Purchase Qty</th>
              <th className="p-2">Sold Qty</th>
              <th className="p-2">Remaining</th>
              <th className="p-2">MRP</th>
              <th className="p-2">Cost/Unit</th>
              <th className="p-2">Profit</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 && (
              <tr><td className="p-4" colSpan={8}>No items yet</td></tr>
            )}
            {items.map(it => (
              <tr key={it.id} className="border-t">
                <td className="p-2">{it.itemName}</td>
                <td className="p-2">{it.purchaseQty}</td>
                <td className="p-2">{it.soldQty}</td>
                <td className="p-2">{calcRemaining(it)}</td>
                <td className="p-2">₹{it.mrp}</td>
                <td className="p-2">₹{it.cost}</td>
                <td className="p-2">₹{calcProfit(it)}</td>
                <td className="p-2">
                  <button onClick={()=>onSell(it.id)} className="text-sm bg-brandGreen text-white px-2 py-1 rounded mr-2">Sell 1</button>
                  <button onClick={()=>onDelete(it.id)} className="text-sm bg-gray-300 px-2 py-1 rounded">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
