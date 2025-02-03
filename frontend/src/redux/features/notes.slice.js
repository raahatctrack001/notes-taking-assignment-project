import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
  },
  reducers: {
    addNote: (state, action) => {
      
      state.notes.push(action.payload); // Merge without duplicates
    },
    editNote: (state, action) => {
      const index = state.notes.findIndex((note) => note.id === action.payload.id);
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    deleteNote: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    searchNotes: (state, action) => {
      const query = action.payload.toLowerCase();
      return {
        ...state,
        notes: state.notes.filter((note) =>
          note.title.toLowerCase().includes(query) ||
          note.content.toLowerCase().includes(query)
        ),
      };
    },
  },
});

export const { addNote, editNote, deleteNote, searchNotes } = notesSlice.actions;
export default notesSlice.reducer;
