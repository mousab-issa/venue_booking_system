declare global {
  interface TypeVenue {
    id: number;
    title: string;
    description: string;
    photo: string;
  }

  interface TypeScenic {
    id: number;
    title: string;
    photo: string;
    price_rate: number;
  }

  interface TypeKulliahDetails {
    id: string;
    hotel_id: number;
    city: string;
    possibilities: string[];
    max_adult_size: number;
    child_status: boolean;
    room_type: TypeVenue[];
    room_scenic: TypeScenic[];
  }
}

export {};
