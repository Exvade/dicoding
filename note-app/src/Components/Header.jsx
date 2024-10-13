export default function Header() {
  return (
    <header className="max-w-full px-[15%] mx-auto flex justify-between py-10">
      <h1 className="text-limeGreen text-3xl font-bold">Note App</h1>
      <input type="text" placeholder="Cari Catatan..." className="border border-limeGreen bg-transparent text-limeGreen px-4 py-1 w-[400px] rounded-md" />
    </header>
  )
}