async function getInfo(userId) {
  try {
    const result = await client.users.info({
      user: userId,
    });
  } catch (err) {
    console.err(err);
  }
}

const userClient = {};

export default userClient;
