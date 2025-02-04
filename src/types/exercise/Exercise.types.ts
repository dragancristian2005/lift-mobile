export type Exercise = {
  id: string;
  name: string;
  image: string;
  difficulty: string;
  demonstrationGif: string;
  description: string;
  type: string;
};

export type AddedExercise = {
  id: string;
  name: string;
  sets: {
    id: string;
    reps: number;
    weight: number;
  }[];
};
