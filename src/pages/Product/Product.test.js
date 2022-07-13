import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Product from './Product';

const mockData = [
  {
    _id: '623cafa6c9260300da46471e',
    product_name: 'Test',
    product_description: 'test',
    product_price: 5,
    product_details: [
      {
        MARQUE: 'test',
      },
      {
        TAILLE: 'test',
      },
      {
        ETAT: 'test',
      },
      {
        COULEUR: 'test',
      },
      {
        EMPLACEMENT: 'test',
      },
    ],
    product_image:
      'https://res.cloudinary.com/df4imwogd/image/upload/v1648144293/vinted/offers/r3lzmdbzwjiwcea024wz.jpg',
  },
];

jest.mock('axios');

describe('Product component tests', () => {
  test('Displays loading message before fetching', () => {
    render(<Product />);
    const message = screen.getByText(/Chargement en cours.../i);

    expect(message).toBeInTheDocument();
  });

  test('Displays the right informations once datas are fetched', () => {
    const component = render(<Product data={mockData} />);
    component.setState({ isLoading: false });
    const itemText = screen.getAllByText(/test/i);
    expect(itemText).not.toHaveLength(0);
  });
});
