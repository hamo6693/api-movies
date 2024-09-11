const Movie = require("../models/movie");

exports.create = async (req, res) => {
  const { name, category, description } = req.body;
  try {
    const movie = await Movie.create({
      name,
      category,
      description,
    });
    await movie.save();

    res.status(200).json({ message: "تم انشاء البيانات", data: movie });
  } catch (e) {
    res.status(500).json({ message: "someting went wrong" });
  }
};

exports.find = async (req, res) => {
  const { id } = req.params;
  const movie = await Movie.findById(id).select("-reviews");
  if (!movie) return res.status(404).send();
  await movie.save();

  res.json({ success: true, data: movie });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { name, category, description } = req.body;
  await Movie.updateOne(
    { _id: id },
    {
      $set: { name, category, description },
    }
  );

  res.json({ success: true });
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Movie.deleteOne({
    _id: id,
  });

  res.json({ success: true });
};

exports.list = async (req, res) => {
    const page = req.query?.page || 1
    const limts = 20
    const skip = (page -1) * limts

  const movies = await Movie.find().select("-reviews").skip(skip)
  res.json({
    success: true,
    data: movies,
  });
};


exports.addReviews = async(req,res) => {
    const {id} = req.params
    const {comment,rate} = req.body
    const movie = await Movie.findById(id)
    if(!movie) return res.status(404).send()
        //البحث عن اضافة التقييم
    const isRated = movie.reviews.findIndex(m=>m.user == req.userId)
    if(isRated > -1) return res.status(404).send({message:"Reviews is already added"})
        const totalRate = movie.reviews.reduce((sum, review) => sum + review.rate, 0)
    const finalRate = (totalRate + rate) / (movie.reviews.length + 1)

    await Movie.updateOne(
        { _id: id },
        {
            $push: {
                reviews: {
                    user: req.userId, comment, rate
                }
            },
            $set: { rate: finalRate }
        }
    )

    res.status(201).json({
        success: true
    })

}
exports.reviews = async(req,res) => {
    const {id} = req.params
    const movie = await Movie.findById(id).select('-reviews._id').populate('reviews.user',"name")
    if(!movie) return res.status(404).send()
    res.json({success:true,data:movie.reviews})
}