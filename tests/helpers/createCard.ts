/**
 * helper method for constructing cards
 * card model is expecting created_at and updated_at to be a dates
 * but api returns strings
 * also it should be returned as a promise, because providers usually returns promises
 *
 * So we want to do like this:
 *
 * const card = {
 *   // card data
 *   created_at: string
 *   updated_at: string
 * };
 *
 * CardsProvider.getCardById.mockReturnValue(createCard(card));
 *
 * // ... rest of the code
 *
 * expect(response).toEqual(card)
 */

import { CardModel } from '../../src/models/api/response';

export const createCard = async (
    cardData: Omit<
        typeof CardModel.static,
        'created_at' | 'updated_at'
    > & { created_at: string; updated_at: string },
): Promise<typeof CardModel.static> => {
    return {
        ...cardData,
        created_at: new Date(cardData.created_at),
        updated_at: new Date(cardData.updated_at),
    };
};
