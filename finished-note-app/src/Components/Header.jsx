export default function Header({ searchQuery, onSearch }) {
  return (
    <header className="max-w-full px-[15%] mx-auto flex justify-between py-10">
      <h1 className="text-limeGreen text-3xl font-bold">Note App</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        placeholder="Cari catatan..."
        className="border border-limeGreen bg-transparent text-limeGreen px-4 py-1 w-[400px] rounded-md"
      />
    </header>
  );
}
