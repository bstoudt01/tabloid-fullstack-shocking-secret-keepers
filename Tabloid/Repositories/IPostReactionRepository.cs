﻿using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostReactionRepository
    {
        void AddPostReaction(PostReaction postReaction);
        List<PostReaction> GetAllReactionsByPostId(int id);
    }
}