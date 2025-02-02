const { CohortManager } = require('../src/CohortManager.js')

describe('Cohort Manager', () => {
  let cohortManager
  beforeEach(() => {
    cohortManager = new CohortManager()
  })

  it('create a cohort if it does not exist', () => {
    // setup
    cohortManager.createCohort('Cohort 1')

    // execution
    // check
    expect(cohortManager.cohorts.length).toEqual(1)
  })

  it('throw an error if the cohort does exist', () => {
    // setup
    cohortManager.createCohort('Cohort 1')

    // execution
    // check
    expect(() => cohortManager.createCohort('Cohort 1')).toThrowError(
      'Cohort already exists'
    )
  })

  it('finds a cohort if it exists', () => {
    // setup
    cohortManager.createCohort('Cohort 1')

    // execution
    // check
    expect(cohortManager.findCohortByName('Cohort 1').id).toEqual(1)
  })

  it('returns an error if the cohort does not exist', () => {
    // setup
    cohortManager.createCohort('Cohort 1')

    // execution
    // check
    expect(() => cohortManager.findCohortByName('Cohort 2').id).toThrowError(
      'Cohort doesnt exist'
    )
  })

  it('add a student to the cohort if it exists and the student is not already present', () => {
    // setup
    cohortManager.createCohort('Cohort 1')

    // execution
    cohortManager.addStudentToCohort('Bob Smith', 'Cohort 1')

    // check
    expect(
      cohortManager.findCohortByName('Cohort 1').students[0].firstName
    ).toEqual('Bob')
  })

  it('cohort exists but student is already present', () => {
    // setup
    cohortManager.createCohort('Cohort 1')
    cohortManager.addStudentToCohort('Bob Smith', 'Cohort 1')

    // execution
    // check
    expect(() =>
      cohortManager.addStudentToCohort('Bob Smith', 'Cohort 1')
    ).toThrowError('Student is already in the cohort')
  })

  it('cohort does not exist when student is added to the cohort', () => {
    // setup
    // execution
    // check
    expect(() =>
      cohortManager
        .addStudentToCohort('Bob Smith', 'Cohort 1')
        .toThrowError('Cohort doesnt exist')
    )
  })

  it('remove a cohort by its name', () => {
    // setup
    cohortManager.createCohort('Cohort 1')
    // execution
    cohortManager.removeCohortByName('Cohort 1')
    // check
    expect(cohortManager.cohorts.length).toEqual(0)
  })

  it('returns an error if the cohort doesnt exist', () => {
    // setup
    // execution

    // check
    expect(() => cohortManager.removeCohortByName('Cohort 1')).toThrowError(
      'Cohort doesnt exist'
    )
  })

  it('remove a student from cohort by name', () => {
    // setup
    cohortManager.createCohort('Cohort 1')
    cohortManager.addStudentToCohort('Jim Bob', 'Cohort 1')
    expect(cohortManager.findCohortByName('Cohort 1').students.length).toEqual(
      1
    )

    // execution
    cohortManager.removeStudentFromCohort('Jim Bob', 'Cohort 1')
    // check
    expect(cohortManager.findCohortByName('Cohort 1').students.length).toEqual(
      0
    )
  })

  it('throws an error if the student does not exist in the cohort when trying to remove them', () => {
    // setup
    cohortManager.createCohort('Cohort 1')
    cohortManager.addStudentToCohort('Jim Bob', 'Cohort 1')

    // execution
    // check
    expect(() =>
      cohortManager.removeStudentFromCohort('Billy Bob', 'Cohort 1')
    ).toThrowError('Student doesnt exist in the cohort')
  })

  it('throws an error if the cohort does not exist when trying to remove a student', () => {
    // setup
    cohortManager.createCohort('Cohort 1')
    cohortManager.addStudentToCohort('Jim Bob', 'Cohort 1')

    // execution
    // check
    expect(() =>
      cohortManager.removeStudentFromCohort('Billy Bob', 'Cohort 2')
    ).toThrowError('Cohort doesnt exist')
  })
})
