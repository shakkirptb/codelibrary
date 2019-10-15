
class Store {
	public static void main(String[] args) throws InterruptedException {
		Store store = new Store();
		Thread producer = new Thread(new Runnable() {

			@Override
			public void run() {
				try {
					store.produce();
				} catch (InterruptedException e) {
				}

			}
		});
		Thread consumer = new Thread(new Runnable() {

			@Override
			public void run() {
				try {
					store.consume();
				} catch (InterruptedException e) {
				}
			}
		});
		producer.start();
		consumer.start();
		producer.join();
		consumer.join();
	}

	int count = 5;

	public int getCount() {
		return this.count;

	}

	public void produce() throws InterruptedException {
		while (true) {
			//synchronized (this) {
				if (count > 10) {
					wait();
					continue;
				}
				count++;					
				System.out.println(this.getCount());
				notify();
				Thread.sleep(1000);
			//}
		}
	}

	public void consume() throws InterruptedException {
		while (true) {
			//synchronized (this) {
				if (count <= 0) {
					wait();
					continue;
				}
				count--;
				System.out.println(this.getCount());
				notify();
				Thread.sleep(1000);
			//}
		}
	}
}