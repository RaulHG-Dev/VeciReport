interface Props {
  data: string;
}

export function ItemProps(props: Props) {
  return (
    <div>
      <p>Este es un dato mandado como prop: {props.data}</p>
    </div>
  )
}