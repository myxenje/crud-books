exports.up = function(knex) {
    return knex('book').insert([
        {
          id: 1,
          author: 'Michel Cardoso',
          title: 'The Bonzi Books',
          launchDate: '2026-11-20',
          price: 77
        },
        {
          id: 2,
          author: 'Cardoso Michel',
          title: 'Rover: The Story of a Dog',
          launchDate: '2026-11-20',
          price: 88
        },
        {
          id: 3,
          author: 'Leo Monaro',
          title: 'Valorant guide',
          launchDate: '2026-10-22',
          price: 92
        },
        {
          id: 4,
          author: 'Assistente do win xp',
          title: 'Merlin the mage of win xp',
          launchDate: '2004-09-22',
          price: 49
        },
        {
          id: 5,
          author: 'PaperClippy',
          title: 'The cutest little clip in the world: clippy',
          launchDate: '2018-09-25',
          price: 240
        }
      ]);  
};

exports.down = function(knex) {
    return knex('book').del();
};
