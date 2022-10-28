import {pipe} from '../../utils/constants';

export const ingredientsSelector = (state) => state.ingredients;

export const ingredintsIdsSelector = pipe(ingredientsSelector, (ingredients) => Object.keys(ingredients.data));

export const ingredientsIdsByCategoriesSelector = pipe(ingredientsSelector, (ingredients) => {
    return Object.values(ingredients.data).reduce((acc, item) => {
        if (acc[item.type]) {
            acc[item.type].items.push(item._id);
        }

        return acc;
    }, {
        bun: {title: "Булки", items: []},
        main: {title: "Начинки", items: []},
        sauce: {title: "Соусы", items: []},
    });
});

export const ingredientsRequestStatusSelector = pipe(ingredientsSelector, (ingredients) =>  ingredients.ingredientsRequest);

export const ingredientsFailedStatusSelector = pipe(ingredientsSelector, (ingredients) => ingredients.ingredientsFailed);

export const createIngredientSelector = (id) => pipe(ingredientsSelector, (ingredients) => ingredients.data[id]);

export const createIngredientsSelector = (ids) => pipe(ingredientsSelector, (ingredients) => Object.values(ingredients.data).filter(item => ids.includes(item['_id'])));