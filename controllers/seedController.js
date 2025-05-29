const Schedule = require('../models/Schedule');

// Dummy user ID
const DUMMY_USER_ID = '6655a661ebf30dfd0fd8b123';

// Dummy food items
const dummyFoods = [
  {
    foodItem: "Grilled Chicken Salad",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
    nutrition: { protein: 30, carbs: 10, fat: 8 }
  },
  {
    foodItem: "Veggie Bowl",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd",
    nutrition: { protein: 12, carbs: 35, fat: 5 }
  },
  {
    foodItem: "Beef Steak",
    image: "https://images.unsplash.com/photo-1432139509613-5c4255815697",
    nutrition: { protein: 40, carbs: 5, fat: 20 }
  },
  {
    foodItem: "Tofu Stir Fry",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    nutrition: { protein: 20, carbs: 15, fat: 10 }
  },
  {
    foodItem: "Salmon & Quinoa",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2",
    nutrition: { protein: 35, carbs: 20, fat: 15 }
  },
  {
    foodItem: "Pasta Primavera",
    image: "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb",
    nutrition: { protein: 15, carbs: 50, fat: 12 }
  },
  {
    foodItem: "Egg White Omelette",
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    nutrition: { protein: 22, carbs: 3, fat: 6 }
  }
];

exports.createWeeklySubscription = async (req, res) => {
  try {
    const baseDate = new Date(); // today
    const scheduledTime = "12:00"; // fixed lunch slot

    const dataToInsert = dummyFoods.map((item, index) => {
      const scheduledDate = new Date(baseDate);
      scheduledDate.setDate(baseDate.getDate() + index); // increment day

      return {
        userId: DUMMY_USER_ID,
        foodItem: item.foodItem,
        image: item.image,
        nutrition: item.nutrition,
        scheduledDate,
        scheduledTime,
        status: "scheduled"
      };
    });

    const inserted = await Schedule.insertMany(dataToInsert);

    res.status(201).json({
      message: "Weekly subscription seeded successfully",
      inserted
    });
  } catch (error) {
    console.error("Seeding error:", error);
    res.status(500).json({ message: "Failed to seed subscription data" });
  }
};
