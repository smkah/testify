interface SimpleComponentProps {
  name: string;
}

export function SimpleComponent({ name }: SimpleComponentProps) {
  return <div>Hello, {name}! This is a server-rendered component.</div>;
}
