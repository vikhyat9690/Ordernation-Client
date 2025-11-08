'use client';
import { useState } from "react";

export default function ProductForm({ initialValues = {}, onSubmit }: any) {
  const [form, setForm] = useState(initialValues);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={form.name || ""} onChange={handleChange} placeholder="Name" />
      <input name="sku" value={form.sku || ""} onChange={handleChange} placeholder="SKU" />
      <input name="price" value={form.price || ""} onChange={handleChange} placeholder="Price" type="number"/>
      <input name="special_price" value={form.special_price || ""} onChange={handleChange} placeholder="Special Price" type="number"/>
      <input name="short_description" value={form.short_description || ""} onChange={handleChange} placeholder="Short Description" />
      <input name="long_description" value={form.long_description || ""} onChange={handleChange} placeholder="Long Description" />
      <input name="base_image_url" value={form.base_image_url || ""} onChange={handleChange} placeholder="Image URL" />
      <button type="submit">Save</button>
    </form>
  );
}
