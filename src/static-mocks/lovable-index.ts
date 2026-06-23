export const lovable = {
  auth: {
    signInWithOAuth: async () => ({ error: { message: "Google prijava nije dostupna u offline verziji." } as any }),
  },
};
