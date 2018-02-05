defmodule CalcTest do
  use ExUnit.Case
  doctest Calc

  test "addition" do
    assert Calc.eval("2 + 3 + 4.2") == 9.2
  end

  test "subtraction" do
    assert Calc.eval("7 - 5 - 1") == 1.0
  end

  test "multiplication" do
    assert Calc.eval("1 * 2 * 3") == 6.0
  end

  test "division" do
    assert Calc.eval("8 / 2 / 2") == 2.0
  end

  test "perens" do
    assert Calc.eval("8 + (2 * (4 / 2)) - 1") == 11.0
  end

  test "order of operations" do
    assert Calc.eval("8 / 2 + 2 * 3 - 8") == 2.0
  end

  # TODO INVALID INPUTS

end
