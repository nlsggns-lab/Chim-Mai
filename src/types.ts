export interface OriginInfo {
  cuisine: string;
  region: string;
  source: string;
  story: string;
  flag: string;
}

export interface Ingredient {
  item: string;
  amount: string;
  note?: string;
}

export interface CookingStep {
  number: number;
  instruction: string;
  timer?: {
    duration: number; // in seconds
    label: string;
  };
  tip?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: string;
  carbs: string;
  fat: string;
}

export interface CommunitySubmission {
  id: string;
  userName: string;
  userAvatar: string;
  userImage?: string;
  comment: string;
  date: string;
  likes: number;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  origin: OriginInfo;
  difficulty: "Beginner" | "Intermediate" | "Chef";
  prepTime: string;
  cookTime: string;
  servings: number;
  nutrition: NutritionInfo;
  ingredients: Ingredient[];
  steps: CookingStep[];
  communityMadeCount: number;
  todayViews: number;
  rating: number;
  tags: string[];
  dormFriendly?: boolean;
  estimatedCost?: { amount: number; currency: string; tier: "green" | "yellow" | "orange" };
  equipment?: string[];
}

export interface ShoppingListItem {
  id: string;
  item: string;
  amount: string;
  recipeTitle: string;
  completed: boolean;
}

export interface KitchenJournal {
  cookedRecipeIds: string[]; // recipes marked as "I Made This!"
  savedRecipeIds: string[];  // bookmarks
  viewedRecipeIds: string[]; // history
  communitySubmissions: { [recipeId: string]: CommunitySubmission[] };
}
