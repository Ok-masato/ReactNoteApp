import "./App.css";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import { useEffect, useState } from "react";
import uuid from "react-uuid";

function App() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes") || [])
  );
  const [activeNote, setActiveNote] = useState(false);

  // notesの変更を監視
  useEffect(() => {
    // localStorageにnotesを保存
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  // 初回レンダリング時のみ実行 → 最初のノートを選択
  useEffect(() => {
    setActiveNote(notes[0].id);
  }, []);

  // ノートを追加する関数
  const onAddNote = () => {
    console.log("新しくノートが追加されました。");
    const newNote = {
      // uuid()は、一意のIDを生成する関数
      id: uuid(),
      title: "new note",
      content: "",
      // Date.now()は、現在の日時を取得する関数
      modDate: Date.now(),
    };
    // ...notesは、以前のnotesの中身を展開している
    // newNoteは、新しく追加されるノート
    // これらを結合して、新しいnotesを作成
    setNotes([...notes, newNote]);
    console.log(notes);
  };

  // ノートを削除する関数
  const onDeleteNote = (id) => {
    // ノートのIDが一致しないものだけを抽出して、新しい配列を作成
    // filter: 配列の要素を条件に応じて抽出する関数
    const filterNotes = notes.filter((note) => note.id !== id);
    setNotes(filterNotes);
  };

  // 選択されたノートの内容を取得する関数
  const getActiveNote = () => {
    // notesの中から、activeNoteと一致するノートを取得
    // find: 配列の要素を条件に応じて取得する関数
    return notes.find((note) => note.id === activeNote);
  };

  // 修正された新しいノートの配列を返す関数
  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      } else {
        return note;
      }
    });

    setNotes(updatedNotesArray);
  };

  return (
    <div className="App">
      {/* Sidebarコンポーネントにpropsを渡す */}
      <Sidebar
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        notes={notes}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      />
      {/* Mainコンポーネントにpropsを渡す
       getActiveNote()は、選択されたノートの内容を取得する関数
       これをactiveNoteとして渡す */}
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
    </div>
  );
}

export default App;
