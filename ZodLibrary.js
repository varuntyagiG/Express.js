const zod = require("zod");

function Validation(obj) {
  const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(7),
  });

  const response = schema.safeParse(obj);
  console.log(response);
}

Validation({
  email: "varun@gmail.com",
  password: "Varun",
});
