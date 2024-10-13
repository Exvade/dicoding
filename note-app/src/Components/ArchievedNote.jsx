import { showFormattedDate } from '../data/index';

export default function ArchievedNote({ cardData, onDelete, onUnarchive }) {
  const archivedNotes = cardData.filter((note) => note.archived);

  return (
    <div className="mx-auto max-w-[80%] mt-20">
      <h2 className="font-semibold text-limeGreen text-3xl text-center mb-10">Catatan Diarsipkan</h2>
      {archivedNotes.length > 0 ? (
        <div className="flex flex-wrap justify-center">
          {archivedNotes.map((note) => (
            <div key={note.id} className="border border-gray-400 flex flex-col p-4 m-2 w-[230px] rounded-lg justify-between">
              <div>
                <h1 className="text-18px font-bold text-lg mb-2 text-white">{note.title}</h1>
                <p className="text-[12px] text-grayText mb-2">{showFormattedDate(note.createdAt)}</p>
                <p className="text-[14px] text-white font-semibold">{note.body}</p>
              </div>
              <div className="flex space-x-2 mt-4 justify-self-end">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded-sm flex justify-center items-center gap-[2px]"
                  onClick={() => onDelete(note.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 11v6m-4-6v6M6 7v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7M4 7h16M7 7l2-4h6l2 4"></path>
                  </svg>
                  <span>Delete</span>
                </button>
                <button
                  className="bg-blue-500 text-white px-2 py-1 flex justify-center items-center gap-[2px]"
                  onClick={() => onUnarchive(note.id)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="m12 10l-4 4l1.4 1.4l1.6-1.6V18h2v-4.2l1.6 1.6L16 14zM5 8v11h14V8zm0 13q-.825 0-1.412-.587T3 19V6.525q0-.35.113-.675t.337-.6L4.7 3.725q.275-.35.687-.538T6.25 3h11.5q.45 0 .863.188t.687.537l1.25 1.525q.225.275.338.6t.112.675V19q0 .825-.587 1.413T19 21zm.4-15h13.2l-.85-1H6.25zm6.6 7.5"></path></svg>
                  <span>Aktifkan</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Tidak ada catatan diarsipkan</p>
      )}
    </div>
  );
}

