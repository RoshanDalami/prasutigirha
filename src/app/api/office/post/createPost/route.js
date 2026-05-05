import { Post } from "src/Model/officeSetupModels/post.model";
import { NextResponse, NextRequest } from "next/server";
import { connect } from "src/dbConfig/dbConfig";
connect();
export async function POST(req, res) {
  const { userId, postName, departmentId } = await req.json();
  try {
    let postId = 1;
    const latestPost = await Post.findOne({}, {}, { sort: { postId: -1 } });
    if (latestPost) {
      const latestPostId = latestPost?.postId;
      postId = latestPostId + 1;
    }
    const newPost = new Post({
      userId,
      postName,
      departmentId,
      postId,
    });
    await newPost.save();
    return NextResponse.json(
      { message: "Post created Successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
