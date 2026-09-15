// src/types/marioKart.ts

export interface CharacterVariant {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Character {
  id: string;
  name: string;
  imageUrl: string;
  variants?: CharacterVariant[];
  dlc?: 4 | 5 | 6;
}

export interface VehicleBody {
  id: string;
  name: string;
  type: "Kart" | "Bike" | "ATV";
  imageUrl: string;
}

export interface VehiclePart {
  id: string;
  name: string;
  imageUrl: string;
}

export interface MarioKartData {
  characters: Character[];
  vehicles: {
    bodies: VehicleBody[];
    tires: VehiclePart[];
    gliders: VehiclePart[];
  };
}