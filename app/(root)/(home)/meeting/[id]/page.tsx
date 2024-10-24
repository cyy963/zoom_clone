const Meeting = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;
  return (
    <div>Meeting Room: #{params.id}</div>
  )
}
export default Meeting