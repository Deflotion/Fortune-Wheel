var padding = { top: 20, right: 40, bottom: 0, left: 0 },
  w = 500 - padding.left - padding.right,
  h = 500 - padding.top - padding.bottom,
  r = Math.min(w, h) / 2,
  rotation = 0,
  oldrotation = 0,
  picked = 100000,
  oldpick = [],
  color = d3.scale.category20(); //category20c()

var data = [
  { label: '1', value: 1, question: 'Ko je zaslužan za početak teorije grafova?' }, // padding
  { label: '2', value: 1, question: 'Koji je stepen čvorova ciklusa?' }, //font-family
  { label: '3', value: 1, question: 'Ko je napisao istoriju Peloponeskog rata?' }, //color
  { label: '4', value: 1, question: 'Ko je začetnik pozitivizma?' }, //font-weight
  { label: '5', value: 1, question: 'Kako se zove nauka koja proučava tkiva?' }, //font-size
  { label: '6', value: 1, question: 'Koji izotop ugljenikovog atoma se koristi za određivanje apsolutne hronologije?' }, //background-color
  { label: '7', value: 1, question: 'Iliri, Sloveni, Kelti - poređati narode po starosti od najstarijeg.' }, //nesting
  { label: '8', value: 1, question: 'Koja vrsta istorijskih izvora se čuva u muzeju?' }, //bottom
  { label: '9', value: 1, question: 'Koliko ima prirodnih satelita u unutrašnjim planetama Sunčevog sistema?' }, //sans-serif
  { label: '10', value: 1, question: 'Kako se obeležava par hromozoma kod žena?' }, //period
  { label: '11', value: 1, question: 'Zašto ne možemo da potonemo u vodi?' }, //pound sign
  { label: '12', value: 1, question: 'Ko je osmislio periodni sistem?' }, //<body>
  { label: '13', value: 1, question: 'Koji tip talasa je zvuk?' }, //<ul>
  { label: '14', value: 1, question: 'Koji tip veze je prisutan kod etina?' }, //<h1>
  { label: '15', value: 1, question: 'Koja organela održava oblik ćelije?' }, //margin
  { label: '16', value: 1, question: 'Od kog elementa su avioni pretežno izgrađeni?' }, //< >
  { label: '17', value: 1, question: 'Koji senzor meri ugaonu brzinu?' }, // { }
  { label: '18', value: 1, question: 'Ko upravlja GPS satelitima?' }, // { }
  { label: '19', value: 1, question: 'Kako se zove skala kojom se meri tvrdoća minerala?' }, // { }
  { label: '20', value: 1, question: 'Kako se zove skala za određivanje jačine zemljotresa?' }, // { }
  { label: '21', value: 1, question: 'Koje godine je preminuo Stiven Hoking?' }, // { }
  { label: '22', value: 1, question: 'Kako su Rimljani zvali planetu Zemlju?' }, // { }
  { label: '23', value: 1, question: 'Koliko ima planeta u Sunčevom sistemu?' }, // { }
  { label: '24', value: 1, question: 'Koliko treba sunčevoj svetlosti da stigne do Zemlje?' }, // { }
  { label: '25', value: 1, question: 'Koliko ima slojeva u OSI modelu?' }, // { }
];

var svg = d3
  .select('#chart')
  .append('svg')
  .data([data])
  .attr('width', w + padding.left + padding.right)
  .attr('height', h + padding.top + padding.bottom);

var container = svg
  .append('g')
  .attr('class', 'chartholder')
  .attr('transform', 'translate(' + (w / 2 + padding.left) + ',' + (h / 2 + padding.top) + ')');

var vis = container.append('g');

var pie = d3.layout
  .pie()
  .sort(null)
  .value(function (d) {
    return 1;
  });

// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);

// select paths, use arc generator to draw
var arcs = vis.selectAll('g.slice').data(pie).enter().append('g').attr('class', 'slice');

arcs
  .append('path')
  .attr('fill', function (d, i) {
    return color(i);
  })
  .attr('d', function (d) {
    return arc(d);
  });

// add the text
arcs
  .append('text')
  .attr('transform', function (d) {
    d.innerRadius = 0;
    d.outerRadius = r;
    d.angle = (d.startAngle + d.endAngle) / 2;
    return 'rotate(' + ((d.angle * 180) / Math.PI - 90) + ')translate(' + (d.outerRadius - 10) + ')';
  })
  .attr('text-anchor', 'end')
  .text(function (d, i) {
    return data[i].label;
  });

container.on('click', spin);

function spin(d) {
  container.on('click', null);

  //all slices have been seen, all done
  console.log('OldPick: ' + oldpick.length, 'Data length: ' + data.length);
  if (oldpick.length == data.length) {
    console.log('done');
    container.on('click', null);
    return;
  }

  var ps = 360 / data.length,
    pieslice = Math.round(1440 / data.length),
    rng = Math.floor(Math.random() * 1440 + 360);

  rotation = Math.round(rng / ps) * ps;

  picked = Math.round(data.length - (rotation % 360) / ps);
  picked = picked >= data.length ? picked % data.length : picked;

  if (oldpick.indexOf(picked) !== -1) {
    d3.select(this).call(spin);
    return;
  } else {
    oldpick.push(picked);
  }

  rotation += 90 - Math.round(ps / 2);

  vis
    .transition()
    .duration(3000)
    .attrTween('transform', rotTween)
    .each('end', function () {
      //mark question as seen
      d3.select('.slice:nth-child(' + (picked + 1) + ') path').attr('fill', '#111');

      //populate question
      d3.select('#question h1').text(data[picked].question);

      oldrotation = rotation;

      container.on('click', spin);
    });
}

//make arrow
svg
  .append('g')
  .attr('transform', 'translate(' + (w + padding.left + padding.right) + ',' + (h / 2 + padding.top) + ')')
  .append('path')
  .attr('d', 'M-' + r * 0.15 + ',0L0,' + r * 0.05 + 'L0,-' + r * 0.05 + 'Z')
  .style({ fill: 'black' });

//draw spin circle
container.append('circle').attr('cx', 0).attr('cy', 0).attr('r', 60).style({ fill: 'white', cursor: 'pointer' });

//spin text
container.append('text').attr('x', 0).attr('y', 15).attr('text-anchor', 'middle').text('SPIN').style({ 'font-weight': 'bold', 'font-size': '30px' });

function rotTween(to) {
  var i = d3.interpolate(oldrotation % 360, rotation);
  return function (t) {
    return 'rotate(' + i(t) + ')';
  };
}

function getRandomNumbers() {
  var array = new Uint16Array(1000);
  var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);

  if (window.hasOwnProperty('crypto') && typeof window.crypto.getRandomValues === 'function') {
    window.crypto.getRandomValues(array);
    console.log('works');
  } else {
    //no support for crypto, get crappy random numbers
    for (var i = 0; i < 1000; i++) {
      array[i] = Math.floor(Math.random() * 100000) + 1;
    }
  }

  return array;
}
