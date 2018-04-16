/* feedreader.js
 *
 * The spec file that Jasmine will read and contains all
 * of the tests that will be run against the application.
 */

$(function() {
  // Test suite - RSS feeds definition
  describe('RSS Feeds', function() {
    // Test criteria: allFeeds variable has been defined and not empty.
    it('"allFeeds" variable is defined and not empty', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    // Test criteria: Test loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
    function checkURLDefined(allFeedsObj) {
			let keyNames = Object.keys(allFeedsObj);

			it('"allFeeds" variable has the url defined: ' + allFeedsObj.url, function() {
				expect(keyNames[1]).toEqual("url");
				expect(allFeedsObj.url.length).not.toBe(0);
			});
		}

		for (const allFeedsObj of allFeeds) {
			checkURLDefined(allFeedsObj);
		}

    // Test criteria: Test loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
    function checkNameDefined(allFeedsObj) {
			let keyNames = Object.keys(allFeedsObj);

			it('"allFeeds" variable has the name defined: ' + allFeedsObj.name, function() {
				expect(keyNames[0]).toContain("name");
				expect(allFeedsObj.name.length).not.toBe(0);
			});
		}

		for (const allFeedsObj of allFeeds) {
			checkNameDefined(allFeedsObj);
		}
  });

  // Test suite - The menu
  describe('The menu', function() {
    // Test criteria: Test ensures the menu element is hidden by default.
    it('By default, menu hidden', function() {
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    // Test criteria: Test ensures the menu changes visibility when the menu icon is clicked. Two expectations - 1. The menu display when clicked. 2. The menu hides when clicked again.
		it('Menu visible when menu icon clicked', function() {
			$('a.menu-icon-link').trigger("click");
			expect($('body').hasClass('menu-hidden')).toBe(false);
		});

		it('Menu hidden when menu icon clicked again', function() {
			$('a.menu-icon-link').trigger("click");
			expect($('body').hasClass('menu-hidden')).toBe(true);
		});
  });

  // Test suite - Initial Entries
  describe('Initial Entries', function() {
    // Test criteria: Test ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.
    beforeEach(function(done){
      loadFeed(0, done);
    });

    it('"loadFeed" function called and has at least single .entry element within .feed container', function() {
      expect($('.feed .entry').length).toBeGreaterThan(0);
    });
  });

  // Test suite - New Feed Selection
  describe('New Feed Selection', function() {
    // Test criteria: Test ensures when a new feed is loaded by the loadFeed function that the content actually changes
    let feeds = [];

    beforeEach(function(done) {
      loadFeed(0, function() {
        feeds.push($('.feed').html());  //Feed added to feeds array
        loadFeed(1, done);
      });
    });

    it('Content changes when new feed is loaded', function() {
      feeds.push($('.feed').html());  //Feed added to feeds array
      expect(feeds[0]).not.toEqual(feeds[1]);
    });

  });
}());
