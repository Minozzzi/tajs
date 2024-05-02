export class Person {
  static validate(person) {
    if (!person.name) throw new Error("name is required");
    if (!person.cpf) throw new Error("cpf is required");
  }

  static format(person) {
    const [name, ...lastName] = person.name.split(" ");

    return {
      cpf: person.cpf.replace(/\D/g, ""),
      name,
      lastName: lastName.join(" "),
    };
  }

  static save(person) {
    const hasAllKeys = ["cpf", "name", "lastName"].every(
      (prop) => person[prop]
    );

    if (!hasAllKeys) {
      throw new Error(`cannot save invalid person ${JSON.stringify(person)}`);
    }

    return true;
  }

  static process(person) {
    this.validate(person);
    const formattedPerson = this.format(person);
    this.save(formattedPerson);
    return true;
  }
}

Person.process({ name: "Tiago da Silva", cpf: "123.456.789-00" });
