{
  this.state.closedOrders.map((item, index) => {
    return (
      <Card key={index}>
        {item.customerName}
        {item.order.map((item, index) => {
          return <p key={index}> {item.name}</p>;
        })}
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => this.closeOrder(item.id)}
        >
          {" "}
          Entregue{" "}
        </Button>
      </Card>
    );
  });
}
