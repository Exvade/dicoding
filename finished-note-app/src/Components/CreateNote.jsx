import { useState } from 'react';

export default function CreateNote({ onCreate }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const maxTitleLength = 50;

  // Handle perubahan judul dan update sisa karakter
  const handleTitleChange = (e) => {
    if (e.target.value.length <= maxTitleLength) {
      setTitle(e.target.value);
    }
  };

  // Handle perubahan isi catatan
  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  // Handle submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && body.trim()) {
      onCreate({
        id: Date.now(),
        title,
        body,
        createdAt: new Date().toISOString(),
        archived: false,
      });
      // Reset form setelah submit
      setTitle('');
      setBody('');
    }
  };

  return (
    <div className="flex flex-col text-white max-w-[500px] mx-auto">
      <h2 className="font-semibold text-2xl text-limeGreen">Buat Catatan</h2>
      <p className="self-end text-[14px] text-grayText mb-2">
        Sisa karakter: <span className='text-limeGreen'>{maxTitleLength - title.length}</span>
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="text"
          className="bg-transparent border border-limeGreen rounded-md px-4 py-2 mb-2"
          placeholder="Ini adalah judul..."
          value={title}
          onChange={handleTitleChange}
        />
        <textarea
          name="body"
          id="body"
          cols="30"
          rows="10"
          className="bg-transparent border border-limeGreen rounded-md px-4 py-2 mb-2"
          placeholder="Tuliskan catatan mu disini..."
          value={body}
          onChange={handleBodyChange}
        ></textarea>
        <input
          type="submit"
          value="Buat"
          className="bg-purple px-4 py-2"
        />
      </form>
    </div>
  );
}
