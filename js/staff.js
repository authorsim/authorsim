const staffNames = [
  'Miranda', 'Joey', 'Bob', 'Jonathan', 'Christopher', 'Krista', 'Cameron',
  'Frank', 'Alfonso', 'Kerry', 'Don', 'Clint', 'Janice', 'Phyllis', 'Andrew',
  'Todd', 'Clancy', 'Ronald', 'Zach', 'Bartholomew', 'Cindy', 'Nancy', 'Jan',
  'Will', 'Olivia', 'Sophie', 'Emily', 'Jake', 'Alex', 'James', 'Charles'
]

let hireStaff = (slot) => {
  let name = staffNames[Math.floor(Math.random()*staffNames.length)]
  let cost = Math.pow(slot, 2.3) * 50
  if (save.words.total >= cost) {
		save.words.total -= cost
		save['staff']['s' + slot] = {
			active: true,
      writing: 'none',
			name: name,
			prestige: 1,
			level: 1,
			maxLevel: 4,
			exp: 0,
			nextExp: staff.prestige1.maxExp,
			eff: staff.prestige1.eff,
      speed: staff.prestige1.speed,
			progress: 0
		}
	} else {
    errorAlert('This is embarrassing...','You can\'t afford that staff member.')
  }
}

let buyMonkey = () => {
  let words = save['words']
  let monkeys = save['monkeys']
	if (words['total'] >= monkeys['cost']){
		words['total'] -= monkeys['cost']
		monkeys['total'] += 1
	  monkeys['lifetime'] += 1
		monkeys['cost'] = (monkeys['cost'] + 2) * 1.06
		$('#monkeyCost').text(monkeys['cost'])
	} else {
    errorAlert('Whoops.','That monkey is too costly for you.')
  }
  calcGenerating('letters')
}

let levelUp = (slot) => {
  let staff = save['staff']['s' + slot]
  if (staff['level'] === 10) {
    $('#staffExpBar' + slot).hide()
    return
  }
	staff['level'] += 1
	staff['exp'] = 0
	staff['eff'] += 0.05
  staff['speed'] += 0.30
	staff['nextExp'] = ((staff['nextExp'] * 2) * 1.3)
	if (staff['level'] === staff['maxLevel']) {
    $('#staffExpBar' + slot).hide()
    $('#staffProgressArea' + slot).hide()
    $('#staffGraduate' + slot).show()
	}
  calcGenerating(staff['writing'])
}

let staffGraduate = (slot) => {
  let cur = save['staff']['s' + slot]
  let curPrestige = cur['prestige']
  let newPrestige = curPrestige + 1
  let newStats = staff['prestige' + newPrestige]
  cur['level'] = 1
  cur['maxLevel'] = newStats['maxLevel']
  cur['exp'] = 0
  cur['nextExp'] = newStats['maxExp']
  cur['eff'] = newStats['eff']
  cur['speed'] = newStats['speed']
  cur['progress'] = 0
  cur['prestige'] += 1

  $('#staffExpBar' + slot).show()
  $('#staffProgressArea' + slot).show()
  $('#staffGraduate' + slot).hide()
}

let startStaffWriting = (unit, slot) => {
  // If unit is already being worked on, it stops it
  if (unit === save['staff']['s' + slot]['writing']) {
    disengageStaff(slot)
    calcGenerating(unit)
    return
  }
  // Otherwise, stop everything then activate the clicked one
  disengageStaff(slot)
  save['staff']['s' + slot]['writing'] = unit
  calcGenerating(unit)

  // Update the button
  $('#staff' + unit + slot)
    .removeClass('btn-primary')
    .addClass('active btn-success')

  // Update the progress bar
  $('#staffProgress' + slot)
    .addClass('progress-bar-striped active')
}

let disengageStaff = (slot) => {
  units.forEach( (cv, i, arr) => {
    // Update visually
    $('#staff' + cv + slot)
      .removeClass('active btn-success')
      .addClass('btn-primary')
    $('#staffprogress' + slot)
      .removeClass('progress-bar-striped active')
  })

  // Set the unit to nothing
  save['staff']['s' + slot]['writing'] = 'none'
  save['staff']['s' + slot]['progress'] = 0
}
