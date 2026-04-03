const prisma = require("../config/prisma");

exports.getSummary = async (req, res) => {
  try {
    const income = await prisma.record.aggregate({
      _sum: { amount: true },
      where: { type: "INCOME" },
    });

    const expense = await prisma.record.aggregate({
      _sum: { amount: true },
      where: { type: "EXPENSE" },
    });

    const totalIncome = income._sum.amount || 0;
    const totalExpense = expense._sum.amount || 0;

    res.json({
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCategoryTotals = async (req, res) => {
  try {
    const data = await prisma.record.groupBy({
      by: ["category"],
      _sum: { amount: true },
    });

    res.json(data);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getRecentRecords = async (req, res) => {
  try {
    const records = await prisma.record.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    res.json(records);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.getMonthlyTrends = async (req, res) => {
  try {
    const data = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('month', "date") as month,
        SUM(amount) as total
      FROM "Record"
      GROUP BY month
      ORDER BY month ASC
    `;

    res.json(data);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};