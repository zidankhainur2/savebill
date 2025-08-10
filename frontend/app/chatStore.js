import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useChatStore = create(
  persist(
    (set) => ({
      file: null,
      fileContent: "", // Kita akan menyimpan konten file sebagai teks
      question: "",
      responses: [], // Format: [{ question: '...', answer: '...' }]
      loading: false,
      error: null,
      setFile: (file) => {
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            set({ fileContent: e.target.result });
          };
          reader.readAsText(file);
          set({ file });
        } else {
          set({ file: null, fileContent: "" });
        }
      },
      setQuestion: (question) => set({ question }),
      setLoading: (loading) => set({ loading }),
      addResponse: (response) =>
        set((state) => ({ responses: [...state.responses, response] })),
      setError: (error) => set({ error }),
      clearChat: () => set({ responses: [], file: null, fileContent: "" }),
    }),
    {
      name: "chat-storage", // Nama key di localStorage
      storage: createJSONStorage(() => localStorage), // Menggunakan localStorage
      partialize: (state) => ({ responses: state.responses }), // Hanya menyimpan riwayat chat
    }
  )
);
