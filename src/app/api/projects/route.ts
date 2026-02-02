// GET /api/projects - List all projects
// POST /api/projects - Create new project

import { NextRequest, NextResponse } from 'next/server';
import { getProjects, createProject, getFilmmakerProjects } from '@/lib/db';
import { FilmProject } from '@/types';

/**
 * GET /api/projects
 * Query params: status, genre, minBudget, maxBudget, limit, filmmaker
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    const status = searchParams.get('status');
    const genre = searchParams.get('genre');
    const minBudget = searchParams.get('minBudget') ? parseInt(searchParams.get('minBudget')!) : undefined;
    const maxBudget = searchParams.get('maxBudget') ? parseInt(searchParams.get('maxBudget')!) : undefined;
    let limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 20;
    const filmmaker = searchParams.get('filmmaker');

    // Validate limit
    if (limit > 100) limit = 100;
    if (limit < 1) limit = 20;

    const filters: any = { limit };
    if (status) filters.status = status;
    if (genre) filters.genre = genre;
    if (minBudget !== undefined) filters.minBudget = minBudget;
    if (maxBudget !== undefined) filters.maxBudget = maxBudget;

    // If filtering by filmmaker
    if (filmmaker) {
      const result = await getFilmmakerProjects([filmmaker]);
      if (result.success) {
        return NextResponse.json(
          {
            success: true,
            projects: result.projects,
            count: result.projects?.length || 0
          },
          { status: 200 }
        );
      }
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }

    const result = await getProjects(filters);

    if (result.success) {
      return NextResponse.json(
        { success: true, projects: result.projects, count: result.projects?.length || 0 },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Get projects error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/projects
 * Create a new film project
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'filmmakerIds',
      'title',
      'synopsis',
      'genre',
      'budget',
      'sponsorshipNeeded',
      'status',
      'expectedAudience',
      'releasePlatforms',
      'expectedReleaseDate'
    ];

    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null || body[field] === '') {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate filmmakerIds is array
    if (!Array.isArray(body.filmmakerIds) || body.filmmakerIds.length === 0) {
      return NextResponse.json(
        { success: false, error: 'filmmakerIds must be a non-empty array' },
        { status: 400 }
      );
    }

    // Validate budget values
    if (typeof body.budget !== 'number' || body.budget < 0) {
      return NextResponse.json(
        { success: false, error: 'Budget must be a positive number' },
        { status: 400 }
      );
    }

    if (typeof body.sponsorshipNeeded !== 'number' || body.sponsorshipNeeded < 0) {
      return NextResponse.json(
        { success: false, error: 'Sponsorship needed must be a positive number' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['draft', 'active', 'funded', 'in_production', 'completed'];
    if (!validStatuses.includes(body.status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid project status' },
        { status: 400 }
      );
    }

    // Validate releasePlatforms is array
    if (!Array.isArray(body.releasePlatforms) || body.releasePlatforms.length === 0) {
      return NextResponse.json(
        { success: false, error: 'releasePlatforms must be a non-empty array' },
        { status: 400 }
      );
    }

    // Create project data
    const projectData: Omit<FilmProject, 'id' | 'createdAt' | 'updatedAt'> = {
      filmmakerIds: body.filmmakerIds,
      title: body.title,
      synopsis: body.synopsis,
      genre: body.genre,
      budget: body.budget,
      sponsorshipNeeded: body.sponsorshipNeeded,
      currentFunding: body.currentFunding || 0,
      status: body.status,
      scriptSummary: body.scriptSummary || '',
      pitchDeckUrl: body.pitchDeckUrl,
      teaserUrl: body.teaserUrl,
      moodBoardUrl: body.moodBoardUrl,
      expectedAudience: body.expectedAudience,
      releasePlatforms: body.releasePlatforms,
      expectedReleaseDate: new Date(body.expectedReleaseDate),
      sponsorshipPackages: body.sponsorshipPackages || [],
      images: body.images || []
    };

    const result = await createProject(projectData);

    if (result.success) {
      return NextResponse.json(
        {
          success: true,
          projectId: result.projectId,
          message: 'Project created successfully'
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.error('Create project error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create project' },
      { status: 500 }
    );
  }
}
