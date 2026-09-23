// Category: Living room 1
import livingRoom1 from '../assets/living_room1.jpeg';
import livingRoom11 from '../assets/living_room11.jpeg';
import livingRoom12 from '../assets/living_room12.jpeg';

// Category: Living room 2
import livingRoom2 from '../assets/living_room2.jpeg';
import livingRoom21 from '../assets/living_room21.jpeg';
import livingRoom22 from '../assets/living_room22.jpeg';
import livingRoom23 from '../assets/living_room23.jpeg';
import livingRoom24 from '../assets/living_room24.jpeg';
import livingRoom25 from '../assets/living_room25.jpeg';

// Category: Full kitchen
import kitchen1 from '../assets/kitchen1.jpeg';
import kitchen2 from '../assets/kitchen2.jpeg';

// Category: Bedroom
import bedroom1 from '../assets/bedroom1.jpeg';
import bedroom11 from '../assets/bedroom11.jpeg';
import bedroom12 from '../assets/bedroom12.jpeg';
import bedroom13 from '../assets/bedroom13.jpeg';
import bedroom14 from '../assets/bedroom14.jpeg';
import bedroom15 from '../assets/bedroom15.jpeg';

// Category: Full bathroom
import bathroom from '../assets/bathroom.jpeg';

// Category: Gym
import gym1 from '../assets/gym1.jpeg';
import gym11 from '../assets/gym11.jpeg';
import gym12 from '../assets/gym12.jpeg';
import gym13 from '../assets/gym13.jpeg';
import gym14 from '../assets/gym14.jpeg';

// Category: Exterior
import exterior1 from '../assets/exterior1.jpeg';
import exterior11 from '../assets/exterior11.jpeg';
import exterior12 from '../assets/exterior12.jpeg';
import exterior13 from '../assets/exterior13.jpeg';
import exterior14 from '../assets/exterior14.jpeg';
import exterior15 from '../assets/exterior15.jpeg';

// Category: Pool
import pool1 from '../assets/pool1.jpeg';
import pool11 from '../assets/pool11.jpeg';
import pool12 from '../assets/pool12.jpeg';

// Category: Additional photos
import additional1 from '../assets/additional1.jpeg';
import additional11 from '../assets/additional11.jpeg';
import additional12 from '../assets/additional12.jpeg';
import additional13 from '../assets/additional13.jpeg';
import additional14 from '../assets/additional14.jpeg';
import additional15 from '../assets/additional15.jpeg';
import additional16 from '../assets/additional16.jpeg';
import additional17 from '../assets/additional17.jpeg';
import additional18 from '../assets/additional18.jpeg';
import additional19 from '../assets/additional19.jpeg';

export const photoTourCategories = [
  {
    id: 'living-room-1',
    title: 'Living room 1',
    subtitle: 'Sofa · Air conditioning · Ceiling fan · TV',
    thumbnail: livingRoom1,
    photos: [
      { id: 'lr1-1', url: livingRoom1, alt: 'Living room 1 - main lounge and seating area' },
      { id: 'lr1-2', url: livingRoom11, alt: 'Living room 1 - dining nook and entryway' },
      { id: 'lr1-3', url: livingRoom12, alt: 'Living room 1 - warm ambient lighting' }
    ]
  },
  {
    id: 'living-room-2',
    title: 'Living room 2',
    subtitle: 'Sofa · Balcony · Seating area',
    thumbnail: livingRoom2,
    photos: [
      { id: 'lr2-1', url: livingRoom2, alt: 'Living room 2 - elegant cane sofa setup' },
      { id: 'lr2-2', url: livingRoom21, alt: 'Living room 2 - stone textured wall with accent lamps' },
      { id: 'lr2-3', url: livingRoom22, alt: 'Living room 2 - cozy corner and coffee table' },
      { id: 'lr2-4', url: livingRoom23, alt: 'Living room 2 - balcony view and seating' },
      { id: 'lr2-5', url: livingRoom24, alt: 'Living room 2 - natural daylight aesthetic' },
      { id: 'lr2-6', url: livingRoom25, alt: 'Living room 2 - stylish living space' }
    ]
  },
  {
    id: 'full-kitchen',
    title: 'Full kitchen',
    subtitle: 'Refrigerator · Microwave · Cooking basics · Stove',
    thumbnail: kitchen1,
    photos: [
      { id: 'k-1', url: kitchen1, alt: 'Full kitchen - wooden modular cabinets and cooktop' },
      { id: 'k-2', url: kitchen2, alt: 'Full kitchen - counter space and appliances' }
    ]
  },
  {
    id: 'bedroom',
    title: 'Bedroom',
    subtitle: 'Double bed · Air conditioning · Wardrobe',
    thumbnail: bedroom1,
    photos: [
      { id: 'b-1', url: bedroom1, alt: 'Bedroom - plush double bed with soft linens' },
      { id: 'b-2', url: bedroom11, alt: 'Bedroom - full view with wardrobe and AC' },
      { id: 'b-3', url: bedroom12, alt: 'Bedroom - bedside table and warm reading lights' },
      { id: 'b-4', url: bedroom13, alt: 'Bedroom - elegant bedroom styling' },
      { id: 'b-5', url: bedroom14, alt: 'Bedroom - window view and curtains' },
      { id: 'b-6', url: bedroom15, alt: 'Bedroom - serene relaxing ambiance' }
    ]
  },
  {
    id: 'full-bathroom',
    title: 'Full bathroom',
    subtitle: 'Hot water · Shower',
    thumbnail: bathroom,
    photos: [
      { id: 'bath-1', url: bathroom, alt: 'Full bathroom - modern vanity, mirror and walk-in shower' }
    ]
  },
  {
    id: 'gym',
    title: 'Gym',
    subtitle: 'Treadmill · Stationary bike · Weights',
    thumbnail: gym1,
    photos: [
      { id: 'g-1', url: gym1, alt: 'Gym - cardio equipment and weight training area' },
      { id: 'g-2', url: gym11, alt: 'Gym - stationary bicycle and fitness gear' },
      { id: 'g-3', url: gym12, alt: 'Gym - dumbbells and workout space' },
      { id: 'g-4', url: gym13, alt: 'Gym - workout machines' },
      { id: 'g-5', url: gym14, alt: 'Gym - fitness room view' }
    ]
  },
  {
    id: 'exterior',
    title: 'Exterior',
    subtitle: 'Building exterior · Surroundings',
    thumbnail: exterior1,
    photos: [
      { id: 'ext-1', url: exterior1, alt: 'Exterior - Amor De Goa building complex architecture' },
      { id: 'ext-2', url: exterior11, alt: 'Exterior - facade view with lush greenery' },
      { id: 'ext-3', url: exterior12, alt: 'Exterior - entrance pathway' },
      { id: 'ext-4', url: exterior13, alt: 'Exterior - palm trees and surroundings' },
      { id: 'ext-5', url: exterior14, alt: 'Exterior - property grounds' },
      { id: 'ext-6', url: exterior15, alt: 'Exterior - sunny neighborhood view' }
    ]
  },
  {
    id: 'pool',
    title: 'Pool',
    subtitle: 'Outdoor pool · Shared access',
    thumbnail: pool1,
    photos: [
      { id: 'p-1', url: pool1, alt: 'Pool - large outdoor swimming pool with courtyard' },
      { id: 'p-2', url: pool11, alt: 'Pool - pristine blue waters and poolside loungers' },
      { id: 'p-3', url: pool12, alt: 'Pool - overhead courtyard pool view' }
    ]
  },
  {
    id: 'additional-photos',
    title: 'Additional photos',
    subtitle: 'Property features and views',
    thumbnail: additional1,
    photos: [
      { id: 'add-1', url: additional1, alt: 'Additional photos - jacuzzi accent lighting' },
      { id: 'add-2', url: additional11, alt: 'Additional photos - interior detail' },
      { id: 'add-3', url: additional12, alt: 'Additional photos - cozy seating arrangement' },
      { id: 'add-4', url: additional13, alt: 'Additional photos - aesthetic decor' },
      { id: 'add-5', url: additional14, alt: 'Additional photos - warm ambient atmosphere' },
      { id: 'add-6', url: additional15, alt: 'Additional photos - architectural detail' },
      { id: 'add-7', url: additional16, alt: 'Additional photos - apartment view' },
      { id: 'add-8', url: additional17, alt: 'Additional photos - balcony perspective' },
      { id: 'add-9', url: additional18, alt: 'Additional photos - leisure amenities' },
      { id: 'add-10', url: additional19, alt: 'Additional photos - evening atmosphere' }
    ]
  }
];

// Helper to get all photos flattened with global indexes for the Lightbox
export const getAllPhotoTourPhotos = () => {
  const all = [];
  photoTourCategories.forEach((cat) => {
    cat.photos.forEach((photo) => {
      all.push({
        ...photo,
        categoryTitle: cat.title,
        globalIndex: all.length
      });
    });
  });
  return all;
};
