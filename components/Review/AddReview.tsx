export const AddReview = ({}: //   firstName,
//   lastName,
//   stars,
//   comment,
//   timestamp,
{
  //   firstName: string;
  //   lastName: string;
  //   stars: number;
  //   comment: string;
  //   timestamp: number;
}) => {
  return (
    <>
      <h2>Reviews Page</h2>
      <h6 className="mb-2 text-muted">Imie</h6>
      {[...Array(5)].map((star) => {
        <h5>⭐ </h5>;
      })}
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut reiciendis
        delectus dignissimos, nisi pariatur fuga officiis itaque fugiat!
        Quibusdam accusantium quae beatae vel.Quas possimus reprehenderit sequi
        quia nesciunt sunt!
      </p>
      <p>
        <small className="text-muted text-bold">3 mins ago</small>
      </p>
    </>
  );
};
