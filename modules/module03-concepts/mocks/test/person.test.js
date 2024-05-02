import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import { Person } from "../src/person";

describe("#Person Suite", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe("#validate", () => {
    it("should throw an error when there is no name", () => {
      const mockInvalidPerson = {
        cpf: "123.456.789-00",
      };

      expect(() => Person.validate(mockInvalidPerson)).toThrow(
        new Error("name is required")
      );
    });

    it("should throw an error when there is no cpf", () => {
      const mockInvalidPerson = {
        name: "name",
      };

      expect(() => Person.validate(mockInvalidPerson)).toThrow(
        new Error("cpf is required")
      );
    });

    it("should throw an error when empty name", () => {
      const mockInvalidPerson = {
        name: "",
        cpf: "123.456.789-00",
      };

      expect(() => Person.validate(mockInvalidPerson)).toThrow(
        new Error("name is required")
      );
    });

    it("should throw an error when empty cpf", () => {
      const mockInvalidPerson = {
        name: "name",
        cpf: "",
      };

      expect(() => Person.validate(mockInvalidPerson)).toThrow(
        new Error("cpf is required")
      );
    });

    it("should not throw an error when person is valid", () => {
      const mockInvalidPerson = {
        name: "name",
        cpf: "123.456.789-00",
      };

      expect(() => Person.validate(mockInvalidPerson)).not.toThrow();
    });
  });

  describe("#format", () => {
    it("should format the person name and CPF", () => {
      const mockPerson = {
        name: "name test lastName",
        cpf: "123.456.789-00",
      };

      const formattedPerson = Person.format(mockPerson);

      const expectedPerson = {
        name: "name",
        lastName: "test lastName",
        cpf: "12345678900",
      };

      expect(formattedPerson).toStrictEqual(expectedPerson);
    });
  });

  describe("#save", () => {
    it("should throw an error when there is no prop name", () => {
      const mockPerson = {
        lastName: "lastName",
        cpf: "12345678900",
      };

      expect(() => Person.save(mockPerson)).toThrow();
    });

    it("should throw an error when there is no prop cpf", () => {
      const mockPerson = {
        name: "name",
        lastName: "lastName",
      };

      expect(() => Person.save(mockPerson)).toThrow();
    });

    it("should throw an error when there is no prop lastName", () => {
      const mockPerson = {
        name: "name",
        cpf: "12345678900",
      };

      expect(() => Person.save(mockPerson)).toThrow();
    });

    it("should save person", () => {
      const mockPerson = {
        cpf: "12345678900",
        name: "name",
        lastName: "lastName",
      };

      const result = Person.save(mockPerson);

      expect(result).toBe(true);
    });
  });

  describe("#process", () => {
    it("should process a valid person", () => {
      const mockPerson = {
        name: "name test lastName",
        cpf: "123.456.789-00",
      };

      jest.spyOn(Person, Person.validate.name).mockReturnValue();
      jest.spyOn(Person, Person.format.name).mockReturnValue({
        name: "name",
        lastName: "test lastName",
        cpf: "12345678900",
      });

      const result = Person.process(mockPerson);

      expect(result).toStrictEqual(true);
    });

    it("should not process a person without CPF", () => {
      const mockPerson = {
        name: "name test lastName",
      };

      jest.spyOn(Person, Person.validate.name).mockImplementation(() => {
        throw new Error("cpf is required");
      });

      expect(() => Person.process(mockPerson)).toThrow(
        new Error("cpf is required")
      );
    });

    it("should not process a person without name", () => {
      const mockPerson = {
        cpf: "123.456.789-00",
      };

      jest.spyOn(Person, Person.validate.name).mockImplementation(() => {
        throw new Error("name is required");
      });

      expect(() => Person.process(mockPerson)).toThrow(
        new Error("name is required")
      );
    });
  });
});
