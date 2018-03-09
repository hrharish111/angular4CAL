def helloworldsystem(some_function):
  def new_function():
    print('hello galaxy')
    some_function()

  return new_function


@helloworldsystem
def hello():
  print("Hello world")


hello()


def find_max(args):
  max_value = args[0]

  for i in args:
    if i > max_value:
      max_value = i
  return max_value

print(find_max([10,11,9,6,5]))

