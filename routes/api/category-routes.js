const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint 

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categoryData = await Category.findAll({
    include: [
      {
        model: Product, 
        attributes: ['product_name'],
      },
    ],
  }); 
  res.json(categoryData);
});

router.get('/category/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Category,
          attributes: ['product'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/api/category:id', async (req, res) => {
  // update a category by its `id` value

    const categoryId = req.params.id;
    const updatedData = req.body;

    try {
      const updatedCategory = await Category.findByIdAndUpdate(categoryId, updatedData, {
          new: true, // Return the updated document
          runValidators: true // Validate the data against the model
      });

      if (!updatedCategory) {
          return res.status(404).send({ message: 'Category not found' });
      }

      res.status(200).send(updatedCategory);
  } catch (error) {
      res.status(400).send({ message: 'Error updating category', error });
  }
});
  

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
