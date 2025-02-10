function status(request, response) {
  response.status(200).json({ message: "deu bom fião" });
}

export default status;
