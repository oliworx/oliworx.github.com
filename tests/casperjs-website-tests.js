casper.test.begin('kurmis.com homepage', 9, function suite(test) {
  casper.start("https://www.kurmis.com/", function() {
  test.assertTitle("Oliver Kurmis", "kurmis.com homepage title is the one expected");
	test.assertElementCount('img', 4, "there are 4 images just as expected");
	test.assertElementCount('h2', 5, "there are 5 H2 headings just as expected");
	test.assertElementCount('h2.content-subhead', 4, "there are 4 sub headings just as expected");
	test.assertResourceExists('d2c89a8-200.jpg', 'Image Beijing confirmed');
	test.assertResourceExists('c190c7f-200.jpg', 'Image Munich confirmed');
	test.assertResourceExists('6a8fb78-200.jpg', 'Image OK-Karate confirmed');
	test.assertResourceExists('4f07f6a-200.jpg', 'Image Mallorca confirmed');
	test.assertTextExists('oliver@kurmis.com', 'Contact email confirmed');
  });

  casper.run(function() {
    test.done();
  });
});
