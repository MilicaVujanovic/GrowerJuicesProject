// data.ts

import { Juice } from "./app/shared/models/Juice";
import { Tag } from "./app/shared/models/Tag";

export const sample_juices: Juice[] = [
  {
    id: '1',
    name: 'Orange Juice',
    price: 5,
    prepareTime: '10-15',
    favorite: true,
    origins: ['USA', 'Spain'],
    imageUrl: 'assets/images/orange-juice.jpeg',
    tags: ['Citrus', 'Fresh', 'Breakfast'],
  },
  {
    id: '2',
    name: 'Apple Juice',
    price: 4,
    prepareTime: '10-15',
    favorite: true,
    origins: ['USA', 'China'],
    imageUrl: 'assets/images/apple-juice.jpg',
    tags: ['Sweet', 'Fresh', 'Breakfast'],
  },
  {
    id: '3',
    name: 'Carrot Juice',
    price: 6,
    prepareTime: '15-20',
    favorite: false,
    origins: ['USA', 'Europe'],
    imageUrl: 'assets/images/carrot-juice.jpg',
    tags: ['Healthy', 'Detox', 'Vegetable'],
  },
  {
    id: '4',
    name: 'Pineapple Juice',
    price: 7,
    prepareTime: '10-15',
    favorite: true,
    origins: ['Philippines', 'Thailand'],
    imageUrl: 'assets/images/pineapple-juice.jpeg',
    tags: ['Tropical', 'Sweet', 'Fresh'],
  },
  {
    id: '5',
    name: 'Grape Juice',
    price: 6,
    prepareTime: '15-20',
    favorite: false,
    origins: ['Italy', 'France'],
    imageUrl: 'assets/images/grape-juice.jpg',
    tags: ['Sweet', 'Fresh', 'Fruit'],
  },
  {
    id: '6',
    name: 'Beet Juice',
    price: 8,
    prepareTime: '20-25',
    favorite: false,
    origins: ['USA', 'Europe'],
    imageUrl: 'assets/images/beet-juice.jpg',
    tags: ['Healthy', 'Detox', 'Vegetable'],
  },
];

export const sample_tags: Tag[] = [
  { name: 'All', count: 6 },
  { name: 'Citrus', count: 1 },
  { name: 'Sweet', count: 2 },
  { name: 'Healthy', count: 2 },
  { name: 'Fresh', count: 4 },
  { name: 'Tropical', count: 1 },
  { name: 'Detox', count: 2 },
  { name: 'Vegetable', count: 2 },
  { name: 'Fruit', count: 1 },
  { name: 'Breakfast', count: 2 },
];
